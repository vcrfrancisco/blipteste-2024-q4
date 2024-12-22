import getTakenetRepos from '../../../../src/controllers/get-takenet-git-repos/index.js'
import requestTakenetGitRepos from '../../../../src/controllers/get-takenet-git-repos/requests/takenet-git-repos.js'

jest.mock('../../../../src/controllers/get-takenet-git-repos/requests/takenet-git-repos.js') 

describe('getTakenetRepos function', () => {
    it('should return formatted repos when API call is successful', async () => {
        const mockRequestResponse = [
            { full_name: 'repo1', description: 'desc1', url: 'url1', language: 'C#', created_at: '2021-01-01T12:00:00Z' },
            { full_name: 'repo2', description: 'desc2', url: 'url2', language: 'C#', created_at: '2021-02-01T12:00:00Z' },
            { full_name: 'repo3', description: 'desc3', url: 'url3', language: 'C#', created_at: '2021-03-01T12:00:00Z' },
            { full_name: 'repo4', description: 'desc4', url: 'url4', language: 'C#', created_at: '2021-04-01T12:00:00Z' },
            { full_name: 'repo5', description: 'desc5', url: 'url5', language: 'C#', created_at: '2021-05-01T12:00:00Z' },
        ]
        
        requestTakenetGitRepos.mockResolvedValueOnce(mockRequestResponse)
        
        const result = await getTakenetRepos()

        expect(result).toHaveLength(5)
        expect(result[0].full_name).toBe('repo1')
        expect(result[3].description).toBe('desc4')
        expect(result[4].created_at).toBe('01/05/2021')
    })

    it('should throw an error when API request fails', async () => {
        requestTakenetGitRepos.mockRejectedValueOnce(new Error('Failed to fetch'))

        await expect(getTakenetRepos()).rejects.toThrow('Failed to fetch')
    })
})
