export interface LoadAnswersBySurvey {
  loadAnswers: (id: string) => Promise<LoadAnswersBySurvey.Result>
}

export namespace LoadAnswersBySurvey {
  export type Result = string[]
}

// Modelo de classe de banco de dados - AccountModel
// AddAccountModel - especifico desta interface
