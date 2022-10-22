import { SurveyModel } from '@/domain/models/'

export interface LoadSurveys {
  load: (accountId: string) => Promise<LoadSurveys.Result>
}

export namespace LoadSurveys {
  export type Result = SurveyModel[]
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
