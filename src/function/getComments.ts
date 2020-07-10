import axios from 'axios'
import { config } from './../config'
import { Comments } from './../constants/types'

const {GITHUB_API} = config

export const getComments = (owner: string, repo: string, issue_number: string, page: number) => {
    const promise = new Promise<Comments>((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${GITHUB_API}/repos/${owner}/${repo}/issues/${issue_number}/comments`,
            params: {
                per_page: 10,
                page
            }
        })
        .then(res => {
            const result: Comments = res.data
            resolve(result)
        })
        .catch(err => {
            reject(err)
        });
    })
    return promise
}