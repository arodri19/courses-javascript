import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveys {
  load: (accountId: string) => Promise<SurveyModel[]>
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
