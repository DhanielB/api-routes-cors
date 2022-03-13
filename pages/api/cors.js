import Cors from 'cors'
import { useRouter } from 'next/router'
import initMiddleware from '../../lib/init-middleware'
import { MongoClient } from "mongodb"

async function authToDatabase() {
    const url = process.env.MONGODB_URL

    const client = new MongoClient(url)

    try {
        await client.connect()
        const collection = client.db("myFirstDatabase").collection("users")

        const response = await collection.findOne();
        
        return response

    } catch (err) {
        return {message:err.stack}
    }
    finally {
        await client.close()
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
  if(process.env.API_KEY == req.body.key) {
    console.log("[Server] Initialized API!")
    console.log("[Server] Correct key API!")
    console.log("[Server] Sending RESPONSE in JSON...")
    const users = await authToDatabase()
    res.status(200).json({
      user:users
    })
  }else{
    console.log("[Server] Initialized API")
    console.log("[Server] Invalid key API see it on logs...")
    console.log("[Server] Sending RESPONSE in JSON...")
    res.status(403).json({
      sucess:"forbidden",
      status:403,
    })
    console.log("[Server] Sended RESPONSE in JSON!")
  }
}
