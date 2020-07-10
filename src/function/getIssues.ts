import axios from 'axios'
import { config } from './../config'
import { listIssues } from './../constants/types'

const {GITHUB_API} = config

export const getIssues = (owner: string, repo: string, page: number) => {
    const promise = new Promise<listIssues>((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${GITHUB_API}/repos/${owner}/${repo}/issues`,
            params: {
                page
            }
        })
        .then(res => {
            const result: listIssues = res.data.filter((item:any) => { //any - pull_request не существует по типу
                return item.pull_request === undefined
            })
            resolve(result)
        })
        .catch(err => {
            reject(err)
        });
    })
    return promise
}