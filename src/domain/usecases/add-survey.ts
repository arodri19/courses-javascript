import { SurveyAnswerModel } from '@/domain/models/survey'

export interface AddSurveyModel {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

export interface SurveyAnswer {
  image?: string
  answer: string
}

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
