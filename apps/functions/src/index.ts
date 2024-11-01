import cors from 'cors'
import express from 'express'
import * as functions from 'firebase-functions/v1'

import router from './router'

const app = express()

const timezone = 'Asia/Tokyo'
process.env.TZ = timezone

app.use(cors({ origin: true }))
app.use(router)

export const api = functions
  .region('asia-northeast1')
  .runWith({
    memory: '1GB' as const,
  })
  .https.onRequest(app)
