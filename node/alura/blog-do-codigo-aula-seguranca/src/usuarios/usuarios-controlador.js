const Usuario = require('./usuarios-modelo');
const {NaoEncontrado, InvalidArgumentError} = require('../erros')

const tokens = require('./tokens')
const {EmailVerificacao, EmailRedefinicaoSenha} = require('./emails')

const {ConversorUsuario} = require('../conversores')

function geraEndereco(rota, token){
  const baseURL = process.env.BASE_URL
  return `${baseURL}${rota}${token}`
}


module.exports = {
  async adiciona(req, res, proximo) {
    const { nome, email, senha, cargo } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email,
        emailVerificado: false,
        cargo
      });

      await usuario.adicionaSenha(senha);
      await usuario.adiciona();

      const token = tokens.verificacaoEmail.cria(usuario.id);
      const endereco = geraEndereco('/usuario/verifica_email/',token)
      const emailVerificacao = new EmailVerificacao(usuario, endereco);
      emailVerificacao.enviaEmail().catch(console.log)

      res.status(201).json();
    } catch (erro) {

      proximo(erro)

    }
  },

  async login (req, res, proximo){

    try {
      const accessToken = tokens.access.cria(req.user.id);
      const refreshToken = await tokens.refresh.cria(req.user.id);
      res.set('Authorization', accessToken);
      res.status(200).send({refreshToken});
    } catch (error) {
      proximo(erro)
    }

  },

  async logout(req, res, proximo) {
    try {
      const token = req.token;
      await tokens.access.invalida(token);
      res.status(204).send();
    } catch (erro) {
      proximo(erro)
    }
  },

  async lista(req, res, proximo) {
    try {
      const usuarios = await Usuario.lista();
      const conversor = new ConversorUsuario(
        'json',
        req.acesso.todos.permitido ? req.acesso.todos.atributos : req.acesso.apenasSeu.atributos
      )
      res.send(conversor.converter(usuarios));
    } catch (error) {
      proximo()
    }
  },

  async verificaEmail(req, res, proximo){
    try {
      const usuario = req.user
      await usuario.verificaEmail()
      res.status(200).json()
    } catch (error) {
      proximo(erro)
    }
  },

  async deleta(req, res, proximo) {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      proximo(erro)
    }
  },

  async esqueciMinhaSenha(req,res,proximo){
    const respostaPadrao = {mensagem: 'Se encontrarmos um usuário com este email, vamos enviar uma mensaegm com as instruções para redefinir a senha'}

    try {
      const email = req.body.email
      const usuario = await Usuario.buscaPorEmail(email)
      const token = await tokens.redefinicaoDeSenha.criarToken(usuario.id)
      const emailVerificacao = new EmailRedefinicaoSenha(usuario,token)
      await emailVerificacao.enviaEmail()

      res.send(respostaPadrao)
    } catch (error) {
      if(error instanceof NaoEncontrado){
        res.send(respostaPadrao)
        return
      }
      proximo(error)
    }
    
  },
  async trocarSenha(req, res, proximo){
    try {
      if(typeof req.body.token === 'string' && req.body.token.trim().lenght === 0){
        throw new InvalidArgumentError("O token está inválido")
      }

      const id = await tokens.redefinicaoDeSenha.verifica(req.body.token)
      const usuario = await Usuario.buscaPorId(id)
      await usuario.adicionaSenha(req.body.senha)
      await usuario.atualizarSenha()
      res.send({mensagem: 'Sua senha foi atualizada com sucesso'})
    } catch (error) {
      proximo(error)
    }

  }
};
