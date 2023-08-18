import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Content from "../Components/Content";
import GoBackIcon from "../Icons/GoBack";
import ShareIcon from "../Icons/Share";
import { useSelector } from "react-redux";
import Share from "../Components/Share";

const Preview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const forms = useSelector((state) => state.forms);
  const profileData = useSelector((state) => state.profileData);
  const imageFile = useSelector((state) => state.profileData.imageFile);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatingURL, setGeneratingURL] = useState(false);
  const [shareMenu, setShareMenu] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const uploadData = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const { image, ...restProfileData } = profileData;

      formData.append("profileData", JSON.stringify(restProfileData));
      formData.append("forms", JSON.stringify(forms));

      const response = await fetch(process.env.REACT_APP_API_KEY, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      navigate(`/preview/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
    }
    return setGeneratingURL(true);
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`${process.env.REACT_APP_API_KEY}/preview/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("mongodb", data);
          setData(data);
          setIsLoading(false);
          setTimeout(() => {
            setGeneratingURL(false);
          }, 7000);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [id]);

  const toggleShareMenu = () => {
    if (!generatingURL) {
      setErrorMsg(true);
    } else {
      setShareMenu(!shareMenu);
      setErrorMsg(false);
    }
  };

  return (
    <div className="bg-blue-400 h-96 p-2 rounded-b-lg text-center">
      <div className="w-full flex justify-between p-2 bg-white rounded-lg">
        <Link to="/" className="btn-preview flex">
          <GoBackIcon />
          <span className="hidden sm:block ml-2">Back to Editor</span>
        </Link>
        <button
          className="btn-default flex"
          onClick={uploadData}
          disabled={generatingURL}
        >
          <ShareIcon />
          <span className="hidden sm:block ml-2">Create URL</span>
        </button>
      </div>

      {
      generatingURL && (
        <div>Data is being uploaded, wait for generating URL</div>
      )}
      <div className="flex flex-col justify-center items-center">
        {
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Content forms={data?.forms} profileData={data} />
            <button className="btn-default flex mb-2" onClick={toggleShareMenu}>
              Share
            </button>
            {
            shareMenu && 
              <Share />
            }
            {
            errorMsg && 
              <div>You must generate a URL before sharing</div>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default Preview;
