import requestTakenetGitRepos from "./requests/takenet-git-repos.js"

const getTakenetRepos = async () => {
  const repos = await requestTakenetGitRepos('takenet');
  const reposInfo = repos.map(
    ({ name, description, url, created_at }) =>
    (
      {
        name,
        description,
        url,
        created_at: new Date(created_at).toLocaleDateString('pt-BR')
      }
    )
  )
  return reposInfo;
}

export default getTakenetRepos;