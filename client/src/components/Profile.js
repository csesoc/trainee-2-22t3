import React from "react";
import ProfilePageTitle from "./ProfilePageTitle/ProfilePageTitle";
import ProfileTracker from "./ProfileTracker/ProfileTracker";
import HowPrepared from "./HowPrepared/HowPrepared";
import DoomFactor from "./DoomFactor/DoomFactor";
import "./ProfileStyling.css";

const Profile = () => {
  return (
    <>
      <div>
        <ProfilePageTitle />
        <DoomFactor />
        <div className="profile-tracker-profile">
          <ProfileTracker />
        </div>
        <div className="how-prepared-profile">
          <HowPrepared />
        </div>
      </div>
    </>
  );
};

export default Profile;
