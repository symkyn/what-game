const initialState = {
    bggUserName: '',
    currentUser: '',
    firstName: '',
    lastName: ''
}

const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";

function reducer(state=initialState, action) {
    switch(action.type){
        case UPDATE_CURRENT_USER:
            return action.payload;
        default: return state;
    }
}

export function updateCurrentUser(bggUserName, currentUser, firstName, lastName){
    return {
        type: UPDATE_CURRENT_USER,
        payload: {bggUserName, currentUser, firstName, lastName}
    }
}

export default reducer;