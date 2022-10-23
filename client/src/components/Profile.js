import React from "react";
import ProfilePageTitle from "./ProfilePageTitle/ProfilePageTitle";
import ProfileTracker from "./ProfileTracker/ProfileTracker";
import HowPrepared from "./HowPrepared/HowPrepared";
import DoomFactor from "./DoomFactor/DoomFactor";

const Profile = () => {
  return (
    <div>
      <ProfilePageTitle />
      <DoomFactor />
      <ProfileTracker />
      <HowPrepared />
    </div>
  );
};

export default Profile;
