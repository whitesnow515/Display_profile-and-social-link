export const updateFirstName = (firstName) => ({
    type: "UPDATE_FIRST_NAME",
    payload: firstName,
  });
  
  export const updateLastName = (lastName) => ({
    type: "UPDATE_LAST_NAME",
    payload: lastName,
  });
  
  export const updateEmail = (email) => ({
    type: "UPDATE_EMAIL",
    payload: email,
  })
  
  export const updateImage = (image) => ({
    type: "UPDATE_IMAGE",
    payload: image,
  });
  export const updateForms = (forms) => ({
    type: "UPDATE_FORMS",
    payload: forms,
  });
  export const updateImageFile = (imageFile) => ({
    type: "UPDATE_IMAGE_FILE",
    payload: imageFile,
  });
  