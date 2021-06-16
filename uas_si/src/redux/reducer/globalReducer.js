import ActionType from './globalAction'

const globalState = {
    userEmail: ""
}

const rootReducer = (state = globalState, action) => {
    switch (action.type) {
        case ActionType.ADD_USER:
            return {
                ...state,
                userEmail: action.newValue 
            }
        default:
            return state;
    }
    // return state;
}

export default rootReducer;