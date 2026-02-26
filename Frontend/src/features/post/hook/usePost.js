import { CreatePost, getfeed , likePost , UnlikePost } from "../services/post.api";
import { useContext, useEffect } from "react";
import { Postcontext } from "../post.context";

export const usePost = () => {
  const context = useContext(Postcontext);

  const {loading , setloading , feed , setfeed , post ,setpost} = context;

  const handlefeed = async () => {
    setloading(true);
    const data = await getfeed();
    setfeed(data.reverse());
    setloading(false);
  };

  const handleCreatePost = async(imageFile , caption)=>{
    setloading(true)
    const data = await CreatePost(imageFile , caption)
    setfeed([data.post , ...feed]);
    setloading(false);
  }

  const handleLike = async (postId) => {
    // setloading(true)
    const data = await likePost(postId)
    // setloading(false)
    await handlefeed()
  }

  const handleUnLike = async (postId) => {
    // setloading(true)
    const data = await UnlikePost(postId)
    // setloading(false)
    await handlefeed()
  }

  useEffect(()=>{
    handlefeed()
  },[])

  return { loading, feed, post, handlefeed , handleCreatePost , handleLike , handleUnLike };
};
