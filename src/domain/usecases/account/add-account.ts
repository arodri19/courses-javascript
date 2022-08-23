import { AccountModel } from '@/domain/models/account'

export type AddAccountModel = Omit<AccountModel, 'id'>

export type AddAccount = {
  add: (account: AddAccountModel) => Promise<AccountModel>
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
