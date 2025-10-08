// lib/mongo.ts
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!
if (!uri) throw new Error('Missing MONGODB_URI')

declare global {
  // чтобы кэш переживал HMR в dev
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, { connectTimeoutMS: 15_000 })
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  const client = new MongoClient(uri, { connectTimeoutMS: 15_000 })
  clientPromise = client.connect()
}

/** Получить подключение */
export async function getClient() {
  return clientPromise // уже подключённый клиент
}

/** Получить БД по умолчанию из URI */
export async function getDb() {
  const client = await getClient()
  return client.db() // без каких-либо checks topology
}
