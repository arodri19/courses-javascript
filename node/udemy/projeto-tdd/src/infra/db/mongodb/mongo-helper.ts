import { Collection, MongoClient, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    return this.client.db().collection(name)
  },
  map: (data: any): any => {
    const { _id, ...rest } = data
    return Object.assign({}, rest, { id: _id })
  },
  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => {
      return MongoHelper.map(c)
    })
  },
  objectId: (data: string): ObjectId => {
    return new ObjectId(data)
  }
}
