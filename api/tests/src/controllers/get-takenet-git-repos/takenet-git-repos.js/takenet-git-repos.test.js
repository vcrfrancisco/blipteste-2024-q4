import axios from 'axios'
import requestTakenetGitRepos from '../../../../../src/controllers/get-takenet-git-repos/requests/takenet-git-repos.js'

jest.mock('axios')

describe('requestTakenetGitRepos function', () => {
    it('should fetch repos successfully', async () => {
        const mockResponse = {
            data: [
                { full_name: 'repo1', description: 'desc1', url: 'url1', language: 'C#', created_at: '2021-01-01T12:00:00Z' }
            ]
        }
        axios.mockResolvedValueOnce(mockResponse)

        const result = await requestTakenetGitRepos('takenet')

        expect(result).toHaveLength(1)
        expect(result[0].full_name).toBe('repo1')
    })

    it('should handle error in API request', async () => {
        axios.mockRejectedValueOnce(new Error('Network error'))

        await expect(requestTakenetGitRepos('takenet')).rejects.toThrow('Network error')
    })

    it('should handle empty response data gracefully', async () => {
        const mockResponse = { data: [] }
        axios.mockResolvedValueOnce(mockResponse)

        const result = await requestTakenetGitRepos('takenet')

        expect(result).toHaveLength(0)
    })
})
