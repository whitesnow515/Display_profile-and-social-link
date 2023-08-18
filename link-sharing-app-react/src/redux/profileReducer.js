const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  imageFile: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_FIRST_NAME":
      return { ...state, firstName: action.payload };
    case "UPDATE_LAST_NAME":
      return { ...state, lastName: action.payload };
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_IMAGE":
      return { ...state, image: action.payload };
    case "UPDATE_IMAGE_FILE":
      return { ...state, imageFile: action.payload };
    default:
      return state;
  }
};

export default profileReducer;
