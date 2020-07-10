import axios from 'axios'
import { config } from './../config'
import { listReposItem, Result } from './../constants/types'

const {GITHUB_API} = config

export const getRepositories = (val: string, page: number) => {
    const promise = new Promise<Result>((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${GITHUB_API}/search/repositories`,
            params: {
                q: val,
                per_page: 10,
                page
            }
        })
        .then(res => {
            const repositories:listReposItem = res.data.items
            const repositoriesHasIssues:listReposItem = repositories.filter((item:any) => { //any - Свойство has_issues не существует по типу
                return item.has_issues
            })
            const total_count: number = res.data.total_count
            resolve({repositories: repositoriesHasIssues, total_count})
        })
        .catch(err => {
            reject(err)
        });
    })
    return promise
}