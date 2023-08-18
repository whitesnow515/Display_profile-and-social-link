import React from "react";
import { Link } from "react-router-dom";
import ProfileImg from "../Icons/Profile";
import PaperClipImg from "../Icons/PaperClip";
import LinkImg from "../Icons/Link";
import PreviewImg from "../Icons/Preview";

import { useNavigate } from "react-router-dom";

const Nav = ({ activeSection, onSectionChange, forms }) => {
  const navigate = useNavigate();

  const handlePreviewClick = () => {
    navigate("/preview", { state: { forms } });
  };

  return (
    <div className="bg-white flex items-center justify-between p-3">
      <div className="flex">
        <PaperClipImg />
        <h1 className="hidden sm:block">
          Link sharing App
        </h1>
      </div>
      <div>
        <button
          className=
            {`btn-default 
            ${
            activeSection === "links" ? "active" : ""
            }`}
          onClick={() => onSectionChange("links")}
        >
          <span className="hidden sm:block">Links</span>
          <span className="sm:hidden">
            <LinkImg />
          </span>
        </button>
        <button
          className=
          {`btn-default ml-2 
          ${
            activeSection === "profile" ? "active" : ""
          }`}
          onClick={() => onSectionChange("profile")}
        >
          <span className="hidden sm:block">Profile Details</span>
          <span className="sm:hidden">
            <ProfileImg />
          </span>
        </button>
      </div>
      <button className="btn-preview" onClick={handlePreviewClick}>
        <Link to="/preview">
          <span className="hidden sm:block">Preview</span>
          <span className="sm:hidden">
            <PreviewImg />
          </span>
        </Link>
      </button>
    </div>
  );
};

export default Nav;
