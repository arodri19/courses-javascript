export interface LoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<LoadAccountByToken.Result>
}

export namespace LoadAccountByToken {
  export type Result = {
    id: string
  }
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
