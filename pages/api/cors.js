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
  if(req.body.name == "Dhaniel") {
    res.status(200).json({
      loggued:"Logado!",
      body:req.body
    })
  }else{
    res.status(200).json({
      not_loggued:"Não logado!",
      body:req.body
    })
  }
}
