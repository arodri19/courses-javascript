import { AccountModel } from '@/domain/models/'

export interface LoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<AccountModel>
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
