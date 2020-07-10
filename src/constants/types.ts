import { Endpoints } from "@octokit/types"

type listRepos = Endpoints["GET /search/repositories"]["response"]
type listUsers = Endpoints["GET /search/users"]["response"]

export type listReposItem = listRepos["data"]["items"]
export type listUsersItem = listUsers["data"]["items"]
export type listIssues = Endpoints["GET /repos/:owner/:repo/issues"]["response"]["data"]
export type listIssue = Endpoints["GET /repos/:owner/:repo/issues/:issue_number"]["response"]["data"]
export type Comments = Endpoints["GET /repos/:owner/:repo/issues/:issue_number/comments"]["response"]["data"]


export type Result = {
    repositories: listReposItem
    total_count?: number | null
}

export type InitialStateType = {
    loading: boolean
    error: string | null
    error_status: number | null
    result: Result
    search_qwery: string | null
    users: listUsersItem
    issues: listIssues
    issue: listIssue
    comments: Comments
}
export type State = {
    searchReducer: InitialStateType
}

export type RepositoriesFromUser = {
    repositories: listReposItem
}