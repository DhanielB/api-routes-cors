import Cors from 'cors'
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
  await cors(req, res)

  // Rest of the API logic
  if(process.env.API_KEY == req.body.key) {
    res.status(200).json({
      sucess:"ok",
      status:200,
      response: "Logado com sucesso...",
      body:req.body
    })
  }else{
    res.status(403).json({
      sucess:"ok",
      status:403,
      response: "Não logado com sucesso...",
      body:req.body
    })
  }
}
