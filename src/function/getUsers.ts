import axios from 'axios'
import { config } from './../config'
import { listUsersItem } from './../constants/types'

const {GITHUB_API} = config

export const getUsers = (val: string) => {
    const promise = new Promise<listUsersItem>((resolve, reject) => {
        axios({
            method: 'GET',
            url: `${GITHUB_API}/search/users`,
            params: {
                q: `${val} repos:>0`,
                per_page: 5
            }
        })
        .then(res => {
            const users: listUsersItem = res.data.items
            resolve(users)
        })
        .catch(err => {
            reject(err)
        });
    })
    return promise
}