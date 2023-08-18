import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateFirstName,
  updateLastName,
  updateEmail,
  updateImage,
  updateImageFile
} from "../redux/actions";

const Profile = () => {

const initialProfileData = JSON.parse(localStorage.getItem('profileData')) || {};
const [selectedImage, setSelectedImage] = useState(initialProfileData.image || "");


  const [firstName, setFirstName] = useState(initialProfileData.firstName || "");
  const [lastName, setLastName] = useState(initialProfileData.lastName || "");
  const [email, setEmail] = useState(initialProfileData.email || "");
  
  const [errorAlert, setErrorAlert] = useState("");

  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(URL.createObjectURL(imageFile));
    dispatch(updateImageFile(imageFile)); 
  };

  const handleImageRemove = () => {
    setSelectedImage("");
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      firstName,
      lastName,
      email,
      image: selectedImage,
    };

    let error = "";

  switch (true) {
    case !firstName || !lastName || !email || !selectedImage:
      error = "Please fill out all required fields.";
      break;
    case !isEmailValid(email):
      error = "Please enter a valid email address.";
      break;
    default:
      dispatch(updateFirstName(profileData.firstName));
      dispatch(updateLastName(profileData.lastName));
      dispatch(updateEmail(profileData.email));
      dispatch(updateImage(profileData.image));
      localStorage.setItem('profileData', JSON.stringify(profileData));
    }

  setErrorAlert(error);
};

  return (
    <>
      <section className="bg-white text-black text-left mx-auto my-2 p-4 w-3/4 rounded-lg">
        <h2 className="font-bold text-lg">Profile Details</h2>
        <p>Add your details to create a personal touch to your profile</p>
        <div className="bg-empty mt-2 p-2 rounded-lg flex justify-center items-center">
          <p className="hidden sm:block">Profile Picture</p>
          <div className="border-solid border-2 border-blue-500 w-32 h-32 relative rounded-lg flex justify-center items-center m-2">
            {
            selectedImage && 
            (
              <img
                name="image"
                className="rounded-lg absolute w-full h-full"
                alt="not found"
                src={selectedImage}
              />
            )}
            <label
              htmlFor="files"
              className="bg-black text-white rounded-lg p-1 absolute cursor-pointer opacity-75"
            >
              {
              selectedImage ? 
                "Change Image" : 
                "Select Image"
              }
            </label>
             {
             selectedImage && 
             (
              <button
                onClick={handleImageRemove}
                className="bg-red-500 text-white p-0.5 rounded-lg absolute bottom-2 right-2"
              >
                Remove
              </button>
            )}
            <input
              id="files"
              className="hidden"
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <p className="hidden sm:block">Image must be PNG, JPG, or BMP format</p>
        </div>
        <div className="bg-empty mt-2 p-2 rounded-lg">
          <form>
            <label htmlFor="firstName">First name*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label htmlFor="lastName">Last name*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-400 p-2 rounded-lg mt-2 text-white"
            >
              Save
            </button>
            { 
              errorAlert && 
            <p className="text-red-500">
              {errorAlert}
            </p>
            }
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
