import axios from 'axios'
import cors from 'cors'
import express from 'express'
import z from 'zod'

const app = express()

app.use(express.json())

app.use(cors({}))

app.post('/perguntar', async (request, response) => {
  try {
    const bodyParams = z.object({
      texto: z.string(),
    })

    const { texto } = bodyParams.parse(request.body)

    const responseOllama = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt: texto,
      stream: false,
    })

    return response.status(200).json({
      resposta: responseOllama.data.response,
    })
  } catch (error) {
    return response.status(500).json({
      error,
      message: 'Erro interno',
    })
  }
})

app.listen(3333, () => {
  console.log('App on!')
})
