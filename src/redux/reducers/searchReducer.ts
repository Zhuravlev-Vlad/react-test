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

import { Result, listUsersItem, listIssues, InitialStateType, listIssue, Comments } from './../../constants/types'

const initialState: InitialStateType = {
    loading: false as boolean,
    error: null as string | null,
    error_status: null as number | null,
    result: {
        repositories: [],
        total_count: 0
    } as Result,
    search_qwery: null as string | null,
    users: [] as listUsersItem,
    issues: [] as listIssues,
    issue: {} as listIssue,
    comments: [] as Comments
}

// TODO Типизировать Action
const searchReducer = ( state = initialState, action: any ): InitialStateType => {
    switch (action.type) {
        case SEARCH_STARTED:
            return {
                ...state,
                loading: true,
                error_status: null
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                error_status: null,
                result: action.payload.result,
                search_qwery: action.payload.search_qwery
            };
        case SEARCH_USERS:
            return {
                ...state,
                loading: false,
                error: null,
                error_status: null,
                users: action.payload.result,
            };
        case SEARCH_REPOSITORIES_FROM_USER:
            return {
                ...state,
                loading: false,
                error: null,
                error_status: null,
                result: action.payload.result,
            }; 
        case ISSUES:
            return {
                ...state,
                loading: false,
                error: null,
                error_status: null,
                issues: action.payload.issues,
            };
        case PUSH_ISSUES:
            return {
                ...state,
                loading: false,
                error: null,
                error_status: null,
                issues: state.issues.concat(action.payload.issues),
            };
        case ISSUE:
            return {
                ...state,
                loading: false,
                error: null,
                error_status: null,
                issue: action.payload.issue,
            }; 
        case COMMENTS:
            return {
                ...state,
                loading: false,
                error: null,
                error_status: null,
                comments: action.payload.comments,
            }; 
        case PUSH_COMMENTS:
            return {
                ...state,
                loading: false,
                error: null,
                error_status: null,
                comments: state.comments.concat(action.payload.comments),
            };  
        case SEARCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                error_status: action.payload.error_status
            };
        default:
            return state;
    }
}

export default searchReducer