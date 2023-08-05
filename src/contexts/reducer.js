export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_LOGIN":
      return { ...state, isAuthenticated: true, user: payload.user };
    case "SET_LOGOUT":
      return null;
    case "SET_ALL_EVENTS":
      return {
        ...state,
        events: payload,
      };
    case "SET_EVENT_DETAILS":
      return {
        ...state,
        details: payload,
      };
    case "GET_SINGLE_EVENT":
      return {
        ...state,
        singleEvent: payload,
      };
    default:
      return state;
  }
};
