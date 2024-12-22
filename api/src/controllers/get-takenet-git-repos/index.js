import requestTakenetGitRepos from "./requests/takenet-git-repos.js"

const getTakenetRepos = async (requestFn = requestTakenetGitRepos) => {
    try {
        const repos = await requestFn('takenet')
        if (!repos || repos.length === 0) {
            throw new Error('No repositories found.')
        }

        const oldest_five_csharp_repos = repos.filter(repo => repo.language === 'C#').slice(0, 5)
        if (oldest_five_csharp_repos.length === 0) {
            throw new Error('No C# repositories found.')
        }

        return oldest_five_csharp_repos.map(({ full_name, description, url, created_at }) => ({
            full_name,
            description,
            url,
            created_at: new Date(created_at).toLocaleDateString('pt-BR'),
        }))
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch repositories.')
    }
}

export default getTakenetRepos
