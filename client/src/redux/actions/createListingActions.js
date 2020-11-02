import {UPDATE_INFO} from '../reducers/createListingTypes'

export const updateInfo = (updateData) => dispatch => {
    dispatch ({
        type: UPDATE_INFO,
        payload: updateData
    })
}