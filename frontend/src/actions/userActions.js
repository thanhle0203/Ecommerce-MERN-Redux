import axios from 'axios';

export const signupUser = (userData) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8000/api/users/signup', userData);
    dispatch({
      type: 'SIGNUP_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'SIGNUP_FAILURE',
      payload: error.response.data
    });
  }
}

export const loginUser = (userData) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8000/api/users/login', userData);
    if (response.status === 201 || response.status === 200) {
      console.log(response.data);  // Add this line
      localStorage.setItem('token', response.data.token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: response.data.token,
          user: response.data.user
        }
      })
    } else {

    }
    
  } catch (error) {
    console.error("Login Error:", error.response ? error.response.data : error.message);
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response ? error.response.data : error.message
    })
  }
}


export const logoutUser = () => dispatch => {

  dispatch({ type: 'LOGOUT_USER'});
}