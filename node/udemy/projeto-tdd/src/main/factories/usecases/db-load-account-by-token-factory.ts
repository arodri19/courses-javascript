import { AccountMongoRepository } from '@/infra/db/mongodb/'
import { LoadAccountByToken } from '@/domain/usecases/'
import { DbLoadAccountByToken } from '@/data/usecases/'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
