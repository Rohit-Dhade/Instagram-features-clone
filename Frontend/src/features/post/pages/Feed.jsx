import React, { useEffect } from "react";
import "../style/feed.scss";
import { usePost } from "../hook/usePost";
import Post from "../components/Post";
import Nav from '../../shared/components/Nav'

const Feed = () => {
  const { loading, feed, post, handlefeed , handleUnLike , handleLike } = usePost();
  useEffect(() => {
    handlefeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading.....</h1>
      </main>
    );
  }

  return (
    <main className="feed-page">
      <Nav/>
        <div className="feed">
          <div className="posts">
            {feed.map((post) => (
              <Post user={post.user} post={post} loading={loading} handleLike={handleLike} handleUnLike={handleUnLike} />
            ))}
          </div>
        </div>
    </main>
  );
};

export default Feed;
