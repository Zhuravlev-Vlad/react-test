
import {
    SEARCH_STARTED, 
    SEARCH_SUCCESS, 
    SEARCH_FAILURE, 
    SEARCH_USERS, 
    SEARCH_REPOSITORIES_FROM_USER, 
    ISSUES,
    ISSUE,
    COMMENTS,
    PUSH_ISSUES,
    PUSH_COMMENTS
} from './../../constants/action_types'
import { getRepositories } from './../../function/getRepositories'
import { getUsers } from './../../function/getUsers'
import { getRepositoriesFromUser } from './../../function/getRepositoriesFromUser'
import { getIssues } from './../../function/getIssues'
import { getIssue } from './../../function/getIssue'
import { getComments } from './../../function/getComments'
import { Dispatch } from 'redux'
import { Result, listUsersItem, listIssues, listIssue, Comments } from './../../constants/types'

export const actionChangeSearchQwery = (search_qwery: string, page: number) => {
    return async(dispatch: Dispatch) => {
        try {
            dispatch(searchStarted());
            const result = await getRepositories(search_qwery, page)
            dispatch(searchSuccess(result, search_qwery));
        } catch (e) {
            dispatch(searchFailure(e));
        }
    };
};

export const actionSearchUser = (search_qwery: string) => {
    return async(dispatch: Dispatch) => {
        try {
            dispatch(searchStarted());
            const result = await getUsers(search_qwery)
            dispatch(searchUsers(result))
        } catch (e) {
            dispatch(searchFailure(e));
        }
    };
};

export const actionGetRepositoriesFromUser = (url: string) => {
    return async(dispatch: Dispatch) => {
        try {
            dispatch(searchStarted());
            const result = await getRepositoriesFromUser(url)
            dispatch(repositoriesFromUser(result))
        } catch (e) {
            dispatch(searchFailure(e));
        }
    };
};

export const actionGetIssues = (owner: string, repo: string, page: number) => {
    return async(dispatch: Dispatch) => {
        try {
            dispatch(searchStarted());
            const result = await getIssues(owner, repo, page)
            dispatch(issues(result))
        } catch (e) {
            dispatch(searchFailure(e));
        }
    };
};

export const actionPushIssues = (owner: string, repo: string, page: number) => {
    console.log('actionPushIssues')
    return async(dispatch: Dispatch) => {
        try {
            dispatch(searchStarted());
            const result = await getIssues(owner, repo, page)
            dispatch(pushIssues(result))
        } catch (e) {
            dispatch(searchFailure(e));
        }
    };
};

export const actionGetIssue = (owner: string, repo: string, issue_number: string) => {
    return async(dispatch: Dispatch) => {
        try {
            dispatch(searchStarted());
            const result = await getIssue(owner, repo, issue_number)
            dispatch(issue(result))
        } catch (e) {
            dispatch(searchFailure(e));
        }
    };
};

export const actionGetComments = (owner: string, repo: string, issue_number: string, page: number) => {
    return async(dispatch: Dispatch) => {
        try {
            dispatch(searchStarted());
            const result = await getComments(owner, repo, issue_number, page)
            dispatch(comments(result))
        } catch (e) {
            dispatch(searchFailure(e));
        }
    };
};

export const actionPushComments = (owner: string, repo: string, issue_number: string, page: number) => {
    return async(dispatch: Dispatch) => {
        try {
            dispatch(searchStarted());
            const result = await getComments(owner, repo, issue_number, page)
            dispatch(pushComments(result))
        } catch (e) {
            dispatch(searchFailure(e));
        }
    };
};

type SearchActionType = {
    type: typeof SEARCH_SUCCESS
    payload?: {}
}

const searchStarted = (): SearchActionType => ({
    type: SEARCH_STARTED
});

const searchSuccess = (result: Result, search_qwery: string): SearchActionType => ({
    type: SEARCH_SUCCESS,
    payload: {
        result,
        search_qwery
    }
});

const searchUsers = (result: listUsersItem): SearchActionType => ({
    type: SEARCH_USERS,
    payload: {
        result,
    }
});

const repositoriesFromUser = (result: Result): SearchActionType => ({
    type: SEARCH_REPOSITORIES_FROM_USER,
    payload: {
        result,
    }
});

const issues = (result: listIssues): SearchActionType => ({
    type: ISSUES,
    payload: {
        issues: result,
    }
});

const pushIssues = (result: listIssues): SearchActionType => ({
    type: PUSH_ISSUES,
    payload: {
        issues: result,
    }
});
  
const issue = (result: listIssue): SearchActionType => ({
    type: ISSUE,
    payload: {
        issue: result,
    }
});

const comments = (result: Comments): SearchActionType => ({
    type: COMMENTS,
    payload: {
        comments: result,
    }
});

const pushComments = (result: Comments): SearchActionType => ({
    type: PUSH_COMMENTS,
    payload: {
        comments: result,
    }
});

const searchFailure = (error: any): SearchActionType => ({
    type: SEARCH_FAILURE,
    payload: {
      error: error.message,
      error_status: error.response.status
    }
});

export default actionChangeSearchQwery