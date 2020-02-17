const initialValue = {
  userData: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
};

const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_USER_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_USER_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_USER_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        userData: action.payload.data.result
      };
    case "POST_USER_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "POST_USER_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "POST_USER_FULFILLED":
      state.userData.push(action.payload.data.data);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        userData: state.userData,
      };
    default:
      return state;
  }
};

export default userReducer;
