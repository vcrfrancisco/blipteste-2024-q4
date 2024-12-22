import request from 'supertest'
import app from '../../src/index.js'

jest.mock('../../src/controllers/get-takenet-git-repos/requests/takenet-git-repos.js', () => ({
    __esModule: true,
    default: jest.fn(),
}))

describe('GET / endpoint', () => {
    it('should return a test message', async () => {
        const response = await request(app).get('/')

        expect(response.status).toBe(200)
        expect(response.text).toBe('teste!')
    })
})

describe('GET /take-repos endpoint', () => {
    jest.setTimeout(15000)

    it('should return a list of repos when API call is successful', async () => {
        const mockRepos = [
            { full_name: 'repo1', description: 'desc1', url: 'url1', created_at: '2021-01-01T12:00:00Z' }
        ]

        jest.spyOn(require('../../src/controllers/get-takenet-git-repos/index.js'), 'default').mockResolvedValueOnce(mockRepos)

        const response = await request(app).get('/take-repos')

        expect(response.status).toBe(200)
        expect(response.body).toEqual(mockRepos)
    })

    describe('Error Handling', () => {
        it('should handle error in API call and return 500', async () => {
            const mockError = new Error('Failed to fetch repositories.')
            require('../../src/controllers/get-takenet-git-repos/index.js').default.mockRejectedValueOnce(mockError);

            const response = await request(app).get('/take-repos')

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Internal Server Error')
            expect(response.body.error).toBe('Failed to fetch repositories.')
        })

        it('should return 500 when no C# repos are found', async () => {
            const mockRepos = [
                { full_name: 'repo1', language: 'JavaScript', description: 'JS Repo', url: 'http://repo1.com', created_at: '2023-01-01' },
                { full_name: 'repo2', language: 'Python', description: 'Python Repo', url: 'http://repo2.com', created_at: '2023-02-01' },
            ]

            require('../../src/controllers/get-takenet-git-repos/requests/takenet-git-repos.js').default.mockResolvedValueOnce(mockRepos);

            const response = await request(app).get('/take-repos')

            expect(response.status).toBe(500)
            expect(response.body.message).toBe('Internal Server Error')
            expect(response.body.error).toBe('No C# repositories found.')
        })

        it('should return 500 when no repositories are found', async () => {
            const mockRepos = []
            require('../../src/controllers/get-takenet-git-repos/requests/takenet-git-repos.js').default.mockResolvedValueOnce(mockRepos);

            const response = await request(app).get('/take-repos')

            expect(response.status).toBe(500)
            expect(response.body.message).toBe('Internal Server Error')
            expect(response.body.error).toBe('No repositories found.')
        })
    })
})
