import { userConstants } from "../actions/constantes";
const initialState = {
    users: [],
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        case userConstants.FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case userConstants.CHANGE_USER_ROLE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.CHANGE_USER_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.map(user =>
                    user._id === action.payload.user._id ? action.payload.user : user
                )
            };
        case userConstants.CHANGE_USER_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
