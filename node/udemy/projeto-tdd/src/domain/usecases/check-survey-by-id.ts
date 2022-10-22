export interface CheckSurveyById {
  checkById: (id: string) => Promise<CheckSurveyById.Result>
}

export namespace CheckSurveyById {
  export type Result = boolean
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
