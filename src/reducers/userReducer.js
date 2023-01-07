import userReducerActions from '../actions/userActions';
const userReducer = (state, action) => {
  switch (action.type) {
    case userReducerActions.LOADING:
      return { ...state, isLoading: true };
    case userReducerActions.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case userReducerActions.USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        currentUser: null,
        users: action.payload,
      };
    case userReducerActions.USER_ACTIVATE:
      return { ...state, currentUser: { id: action.payload } };
    case userReducerActions.USER_DEACTIVATE:
      return { ...state, currentUser: null };
    case userReducerActions.USER_CREATE:
      return {
        ...state,
        currentUser: { id: action.payload.id },
      };
  }
};

export default userReducer;