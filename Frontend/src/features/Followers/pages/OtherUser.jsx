import React from "react";
import "../style/OtherUser.scss";
import { useFollow } from "../hook/useFollow";
import { useEffect } from "react";

const OtherUser = () => {
  const { handleAllUsers, OthersList , handleFollowUser } = useFollow();

  useEffect(() => {
    handleAllUsers();
  }, []);

  async function handlefollow(username){
    await handleFollowUser(username)
  }

  return (
    <div className="Others-list">
      <p>Suggestions</p>
      {OthersList &&
        OthersList.map((suggest) => (
          <div key={suggest._id} className="Others-item">
            <img
              src={suggest.profileImage}
              alt={suggest.username}
              className="profile-img"
            />
            <span className="username">{suggest.username}</span>
            <button onClick={()=>handlefollow(suggest.username)}>Follow</button>
          </div>
        ))}
    </div>
  );
};

export default OtherUser;
