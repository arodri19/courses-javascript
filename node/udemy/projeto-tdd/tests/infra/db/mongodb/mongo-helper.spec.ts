import { MongoHelper as sut } from '@/infra/db/mongodb/mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await sut.disconnect()
  })
  test('Should connect if mongodb is down', async () => {
    const accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
