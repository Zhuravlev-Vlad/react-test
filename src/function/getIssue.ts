import axios from 'axios'
import { config } from './../config'
import { listIssue } from './../constants/types'

const {GITHUB_API} = config

export const getIssue = (owner: string, repo: string, issue_number: string) => {
    const promise = new Promise<listIssue>((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${GITHUB_API}/repos/${owner}/${repo}/issues/${issue_number}`
        })
        .then(res => {
            const result: listIssue = res.data
            resolve(result)
        })
        .catch(err => {
            reject(err)
        });
    })
    return promise
}