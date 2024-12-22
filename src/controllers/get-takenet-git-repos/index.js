import requestTakenetGitRepos from "./requests/takenet-git-repos.js"

const getTakenetRepos = async () => {
  const repos = await requestTakenetGitRepos('takenet')
  const oldest_five_csharp_repos = repos.filter(repo => repo.language === 'C#').slice(0,5)
  const repos_info_formatted = oldest_five_csharp_repos.map(
    ({ name, description, url, created_at }) =>
    (
      {
        name,
        description,
        url,
        created_at: new Date(created_at).toLocaleDateString('pt-BR'),
      }
    )
  )
  return repos_info_formatted
}

export default getTakenetRepos;