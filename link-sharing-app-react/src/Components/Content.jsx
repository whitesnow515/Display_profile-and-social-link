import React from "react";
import { connect } from "react-redux";

const Content = ({ forms, profileData }) => {
  const platformColors = {
    github: "bg-black",
    youtube: "bg-red-600",
    linkedin: "bg-blue-900",
    facebook: "bg-yellow-500",
    twitter: "bg-blue-400",
  };

  const renderValues = () => {
    const valueDivs = forms?.map((form, index) => {
      const { platform, link } = form;
      const backgroundColor = platformColors[platform] || "";

      return (
        <div
          key={index}
          className={`rounded-lg p-1 h-6 flex items-center justify-center 
            ${backgroundColor}
            `}
        >
          <a
            href={link}
            className="text-white"
            target="_blank"
            rel="noreferrer"
          >
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </a>
        </div>
      );
    });

    const countDivs = valueDivs?.length || 0;
    const checkValue = valueDivs || [];

    const emptyDivs = Array.from({ length: 4 - countDivs }, (_, index) => (
      <div key={`empty-${index}`} className="bg-empty rounded-lg p-1 h-6" />
    ));

    return [...checkValue, ...emptyDivs];
  };
  return (
    <aside
      className="
       min-h-[600px] min-w-[300px] 
       bg-iphone-image 
       bg-no-repeat 
       bg-center 
       bg-cover 
       flex flex-col justify-center items-center 
       bg-white rounded-lg m-2 links
       break-words"  
    >
      <div className="mb-3 rounded-full bg-empty w-[100px] h-[100px]">
        {profileData?.image && (
          <img
            className="rounded-full w-full h-full border border-info"
            alt="Profile Pic"
            src={
              profileData?.image.includes("http")
                ? profileData?.image
                : `${process.env.REACT_APP_API_KEY}/uploads/${profileData?.image}`
            }
          />
        )}
      </div>
      <div className="mb-4 bg-empty rounded-lg p-1 w-[50%] max-w-[60%] min-h-[24px]">
        {profileData?.firstName} {profileData?.lastName}
      </div>
      <div className="bg-empty rounded-lg p-1 w-full md:w-[50%] max-w-[60%] text-sm md:text-base min-h-[24px]">
        {profileData?.email}
      </div>
      <div className="w-[200px] mt-2 mb-4 flex flex-col gap-2 text-white rounded-lg">
        {renderValues()}
      </div>
    </aside>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    profileData: ownProps.profileData || state.profileData,
    forms: ownProps.forms || state.forms,
  };
};

export default connect(mapStateToProps)(Content);
