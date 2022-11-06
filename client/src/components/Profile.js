import React from "react";
import { useEffect, useState } from "react";
import ProfilePageTitle from "./ProfilePageTitle/ProfilePageTitle";
import ProfileTracker from "./ProfileTracker/ProfileTracker";
import HowPrepared from "./HowPrepared/HowPrepared";
import DoomFactor from "./DoomFactor/DoomFactor";
import DoomBuddiesListButton from "./DoomBuddiesList/DoomBuddiesListButton";
import "./ProfileStyling.css";
import MiniDashboard from "./MiniDashboard/MiniDashboard";
import { useParams } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <div>
        <ProfilePageTitle />
        <div className="profile-doom-buddies-list-button">
          <DoomBuddiesListButton />
        </div>
        <DoomFactor />
        <div className="profile-mini-dashboard">
          <MiniDashboard />
        </div>
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
