import express from 'express'
import getTakenetRepos from './controllers/get-takenet-git-repos/index.js'

const port = process.env.PORT //TODO: mudar pra variável de ambiente

const app = express()

app.get('/', (req, res) => {
    res.send('teste!')
})

app.get('/take-repos', (req, res) => {
    getTakenetRepos()
        .then(
            (repos) => {
                res.json(repos)
            }
        )
})

app.listen( port, () => {
    console.log(`Server running on port ${port}`)
})