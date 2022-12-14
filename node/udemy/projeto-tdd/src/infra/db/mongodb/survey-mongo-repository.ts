import { LoadSurveysRepository, AddSurveyRepository, LoadSurveyByIdRepository, CheckSurveyByIdRepository, LoadAnswersBySurveyRepository } from '@/data/protocols/'
import { MongoHelper, QueryBuilder } from '@/infra/db/mongodb/'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository, CheckSurveyByIdRepository {
  async add (data: AddSurveyRepository.Params): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
  }

  async loadAll (accountId: string): Promise<LoadSurveysRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [{
            $size: {
              $filter: {
                input: '$result',
                as: 'item',
                cond: {
                  $eq: ['$$item.accountId', new ObjectId(accountId)]
                }
              }
            }
          }, 1]
        }
      })
      .build()

    const surveys = await surveyCollection.aggregate(query).toArray()
    // const surveys: SurveyModel[] = ((await surveyCollection.find().toArray()) as unknown) as SurveyModel[]
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: MongoHelper.objectId(id) })
    // const survey: SurveyModel = ((await surveyCollection.findOne({ _id: MongoHelper.objectId(id) })) as unknown) as SurveyModel
    // const survey: SurveyModel = ((await surveyCollection.findOne({_id: {$toObjectId: id}})) as unknown) as SurveyModel
    return survey && MongoHelper.map(survey)
  }

  async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const query = new QueryBuilder()
      .match({
        _id: MongoHelper.objectId(id)
      })
      .project({
        _id: 0,
        answers: '$answers.answer'
      })
      .build()
    const surveys = await surveyCollection.aggregate(query).toArray()
    return surveys[0]?.answers || []
  }

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({
      _id: MongoHelper.objectId(id)
    }, {
      projection: {
        _id: 1
      }
    })
    // const survey: SurveyModel = ((await surveyCollection.findOne({ _id: MongoHelper.objectId(id) })) as unknown) as SurveyModel
    // const survey: SurveyModel = ((await surveyCollection.findOne({_id: {$toObjectId: id}})) as unknown) as SurveyModel
    return survey != null
  }
}
