import styles from './Prato.module.scss';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import cardapio from 'data/cardapio.json';
import TagsPrato from 'components/TagsPrato';
import NotFound from 'pages/NotFound';
import PaginaPadrao from 'components/PaginaPadrao';

export default function Prato() {
  // const { state } = useLocation();
  const { id } = useParams();
  // const { prato } = state as { prato: typeof cardapio[0]};
  const navigate = useNavigate();
  const prato = cardapio.find(item => item.id === Number(id));
  if(!prato) {
    return <NotFound/>;
  }
  return (
    // <>
    //   <button className={styles.voltar} onClick={() => navigate(-1)}>
    //     {'< Voltar'}
    //   </button>
    //   <section className={styles.container}>
    //     <h1 className={styles.titulo}>
    //       {prato.title}
    //     </h1>
    //     <div>
    //       <img src={prato.photo} alt={prato.title} />
    //     </div>
    //     <div className={styles.conteudo}>
    //       <p className={styles.conteudo__descricao}>
    //         {prato.description}
    //       </p>
    //       <TagsPrato {...prato}/>
    //     </div>
    //   </section>
    // </>
    <Routes>
      <Route path="*" element={<PaginaPadrao/>}>
        <Route index element={
          <>
            <button className={styles.voltar} onClick={() => navigate(-1)}>
              {'< Voltar'}
            </button>
            <section className={styles.container}>
              <h1 className={styles.titulo}>
                {prato.title}
              </h1>
              <div>
                <img src={prato.photo} alt={prato.title} />
              </div>
              <div className={styles.conteudo}>
                <p className={styles.conteudo__descricao}>
                  {prato.description}
                </p>
                <TagsPrato {...prato}/>
              </div>
            </section>
          </>
        }/>
      </Route>
    </Routes>
  );
}