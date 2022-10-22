import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
} from './components/'
import { apiKeyAuthSchema } from './schemas/'

export default {
  securitySchems: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden

}
