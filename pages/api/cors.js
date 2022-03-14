import Cors from 'cors'
import { useRouter } from 'next/router'
import initMiddleware from '../../lib/init-middleware'
import { MongoClient } from "mongodb"

async function authToDatabase(database, collection_database) {
    const url = process.env.MONGODB_URL

    const client = new MongoClient(url)

    try {
        await client.connect()
        const collection = client.db(database).collection(collection_database)

        const response = await collection.find().toArray
        
        return {client: client, collection: collection}

    } catch (err) {
        return {message:err.stack}
    }
}

async function getDatabase(database, collection_database, query) {
    const { client, collection } = await authToDatabase(database, collection_database)
    
    try {
        const result = await collection.find(query).toArray()

        return result
        client.close()
    } catch (err) {
        return {message:err.stack}
    }
}

async function insertDatabase(database, collection_database, query) {
    const { client, collection } = await authToDatabase(database, collection_database)
    
    try {
        const result = await collection.insertOne(query)
        client.close()
    } catch (err) {
        return {message:err.stack}
    }
}

async function deleteDatabase(database, collection_database, query) {
    const { client, collection } = await authToDatabase(database, collection_database)
    
    try {
        const result = await collection.deleteOne(query)
        client.close()
    } catch (err) {
        return {message:err.stack}
    }
}

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function handler(req, res) {
  // Run cors
  console.log("[Server] Initializing CORS...")
  await cors(req, res)
  console.log("[Server] Initialized CORS!")
  // Rest of the API logic
  console.log("[Server] Initializing API...")
  console.log("[Server] Initialized API!")
  console.log("[Server] Correct key API!")
  console.log("[Server] Sending RESPONSE in JSON...")
  if(req.body.method == 'INSERT') {
      insertDatabase(req.body.database, req.body.collection, req.body.query)
  }
  if(req.body.method == 'DELETE') {
      deleteDatabase(req.body.database, req.body.collection, req.body.query)
  }
  const users = await getDatabase("myFirstDatabase", "users", {})
  res.status(200).json({test:users})
}
