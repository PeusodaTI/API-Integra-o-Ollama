import cors from 'cors'
import express from 'express'

const app = express()

app.use(express.json())

app.use(cors({}))

app.get('/', (request, response) => {
    response.send('Ok.')
})

app.listen(3333, () => {
    console.log('App on!')
})

