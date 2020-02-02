import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_WAITERS = 'GET_WAITERS'

/**
 * INITIAL STATE
 */
const initialState = {
  rows: [],
  fields: []
}

/**
 * ACTION CREATORS
 */
const gotWaiters = waiters => ({type: GET_WAITERS, waiters})

/**
 * THUNK CREATORS
 */
export const getWaiters = () => async dispatch => {
  try {
    const res = await axios.get('/api/waiters')
    dispatch(gotWaiters(res.data))
  } catch (err) {
    console.error(err)
  }
}

const filterFieldsFunction = function(array) {
  return array
    .filter(
      field =>
        field.name !== 'id' &&
        field.name !== 'createdAt' &&
        field.name !== 'updatedAt' &&
        !field.name.includes('Id')
    )
    .map(field => field.name)
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WAITERS:
      return {
        ...state,
        rows: action.waiters.rows,
        fields: filterFieldsFunction(action.waiters.fields)
      }
    default:
      return state
  }
}