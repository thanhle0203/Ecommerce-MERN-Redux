const initialState = {
    token: null,
    error: {
        status: "fail",
        message: "Incorrect email or password"
      },
    isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP_SUCCESS': 
            return { 
                ...state,   
                token: action.payload.token, 
                error: null
            };
        case 'SIGNUP_FAILURE':
            return {
                ...state,
                error: action.payload    
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isLoggedIn: true,
                error: null
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.payload
            }
        case 'LOGOUT_USER':
            return {
                ...state,
                user: null,
                token: null,
                isLoggedIn: false,
            };

        default:
            return state;
    }
};



export default userReducer;
