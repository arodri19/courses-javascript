import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyById {
  load: (id: string) => Promise<SurveyModel>
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface