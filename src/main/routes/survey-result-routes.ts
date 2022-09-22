import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSaveSurveyResultController, makeLoadSurveysController } from '@/main/factories/controllers/'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveysController()))
}
