import express from 'express'
import getTakenetRepos from './controllers/get-takenet-git-repos/index.js'

const app = express()

app.get('/', (req, res) => {
    res.send('teste!')
})

app.get('/take-repos', async (req, res, next) => {
    try {
        const repos = await getTakenetRepos()   
        res.json(repos)
    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack)

    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message,
    })
})

export default app
