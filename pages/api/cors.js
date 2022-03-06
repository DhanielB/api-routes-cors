import Cors from 'cors'
import { useRouter } from 'next/router'
import initMiddleware from '../../lib/init-middleware'

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
    res.status(200).json({
      sucess:"ok",
      status:200,
      response: "Logado com sucesso!",
      body:req.body
    })
  }else{
    console.log("[Server] Initialized API")
    console.log("[Server] Invalid key API see it on logs...")
    console.log("[Server] Sending RESPONSE in JSON...")
    res.status(403).json({
      sucess:"forbidden",
      status:403,
      response: "Não logado...",
      body:req.body
    })
    console.log("[Server] Sended RESPONSE in JSON!")
  }
}
