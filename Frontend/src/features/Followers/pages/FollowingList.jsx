import React from "react";
import "../style/following.scss";
import { useFollow } from "../hook/useFollow";
import { useEffect } from "react";

const FollowingList = () => {
  const { handleFollowing ,FollowingList  } = useFollow();

  useEffect(() => {
    handleFollowing();
  }, []);

  return (
    <div className="following-list">
      <p>Following</p>
      {FollowingList &&
        FollowingList.map((following) => (following.status === "accepted" &&
          <div key={following._id} className="following-item">
            <img
              src={following.imgUrl}
              alt={following.follower}
              className="profile-img"
            />
            <span className="username">{following.follower}</span>
          </div>
        ))}
    </div>
  );
};

export default FollowingList;
