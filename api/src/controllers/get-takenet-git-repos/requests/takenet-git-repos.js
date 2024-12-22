import axios from "axios"

const github_token = process.env.GITHUB_TOKEN

export default async function requestTakenetGitRepos() {
  const response = await axios({
    method: "GET",
    url: "/orgs/takenet/repos",
    baseURL: "https://api.github.com",
    params: {
      sort: "created",
      direction: "asc",
      page: 1,
      per_page: 10,
    },
    headers: {
      Authorization: `Bearer ${github_token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    timeout: 15000,
  })
  return response.data
}