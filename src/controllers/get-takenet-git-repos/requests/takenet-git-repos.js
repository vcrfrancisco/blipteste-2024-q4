import axios from "axios"

const github_token = process.env.GITHUB_TOKEN //TODO: mudar esse trem pra variável de env

export default async function requestTakenetGitRepos() {
  const response = await axios({
   method: "GET",
   url: "/orgs/takenet/repos",
   baseURL: "https://api.github.com",
   params: {
    sort: "created",
    direction: "asc",
    page: 1,
    per_page: 5,
  },
   headers:{
        Authorization: `Bearer ${github_token}`,
        "X-GitHub-Api-Version": "2022-11-28",
   },
   timeout: 15000,
})
  return response.data
}