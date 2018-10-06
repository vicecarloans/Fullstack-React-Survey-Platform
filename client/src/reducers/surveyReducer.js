import {FETCH_SURVEYS} from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {

        case FETCH_SURVEYS:
            return action.payload

        default:
            return state
    }
}
