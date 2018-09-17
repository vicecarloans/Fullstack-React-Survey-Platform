import axios from 'axios'
import { FETCH_USER } from './types'

export const fetchUser = () => async (dispatch) => {
    try{
        const result = await axios.get('/api/current_user')
        dispatch({
            type: FETCH_USER,
            payload: result.data,
        })
    }
    catch(e){
        throw new Error(e)
    }
    
}

export const handleToken = (token) => async dispatch => {
    try{
        const res = await axios.post('/api/stripe', token);
        dispatch({
            type: FETCH_USER,
            payload: res.data
        })
    }catch(e){
        throw new Error(e)
    }
}
