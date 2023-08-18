const initialState = [];

const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_FORMS":
      return action.payload;
    default:
      return state;
  }
};

export default formsReducer;
