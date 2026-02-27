import { useContext } from "react";
import { follower, following, OtherUsers , FollowUser } from "../services/follower.api";
import { FollowerContext } from "../follower.context";

export const useFollow = () => {
  const context = useContext(FollowerContext);

  const {
    loading,
    setloading,
    FollowerList,
    setFollowerList,
    FollowingList,
    setFollowingList,
    OthersList,
    setOthersList,
  } = context;

  const handleFollowing = async () => {
    setloading(true);
    const data = await following();
    setFollowingList(data);
  };

  const handleFollower = async () => {
    setloading(true);
    const data = await follower();
    setFollowerList(data);
    setloading(false);
  };

  const handleAllUsers = async () => {
    setloading(true);
    const data = await OtherUsers();
    setOthersList(data);
    setloading(false);
  };

  const handleFollowUser = async (username) =>{
    setloading(true)
    const data = await FollowUser(username);
    setloading(false)
  }

  return { handleFollowing, FollowerList, FollowingList, handleFollower,OthersList ,handleAllUsers,handleFollowUser};
};
