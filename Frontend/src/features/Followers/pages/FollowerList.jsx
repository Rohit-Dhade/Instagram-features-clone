import React from "react";
import "../style/Follower.scss";
import { useFollow } from "../hook/useFollow";
import { useEffect } from "react";

const FollowerList = () => {
  const { handleFollower, FollowerList } = useFollow();

  useEffect(() => {
    handleFollower();
  }, []);

  return (
    <div className="follower-list">
      <p>Follower</p>
      {FollowerList &&
        FollowerList.map((follower) => (follower.status === "accepted" &&
          <div key={follower._id} className="follower-item">
            <img
              src={follower.imgUrl}
              alt={follower.follower}
              className="profile-img"
            />
            <span className="username">{follower.followee}</span>
          </div>
        ))}
    </div>
  );
};

export default FollowerList;
