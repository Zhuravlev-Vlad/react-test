import axios from 'axios'
import { Result, listReposItem } from './../constants/types'

export const getRepositoriesFromUser = (url: string) => {
    const promise = new Promise<Result>((resolve, reject) => {
        axios({
            method: 'GET',
            url
        })
        .then(res => {
            const repositories:listReposItem = res.data
            const repositoriesHasIssues:listReposItem = repositories.filter((item:any) => { //any - Свойство has_issues не существует по типу
                return item.has_issues
            })
            resolve({repositories: repositoriesHasIssues})
        })
        .catch(err => {
            reject(err)
        });
    })
    return promise
}