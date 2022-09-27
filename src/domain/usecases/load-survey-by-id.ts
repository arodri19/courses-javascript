import { SurveyModel } from '@/domain/models/'

export interface LoadSurveyById {
  loadById: (id: string) => Promise<LoadSurveyById.Result>
}

export namespace LoadSurveyById {
  export type Result = SurveyModel
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
