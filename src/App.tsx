import React, { useState } from "react";
import "./App.css";
import Post, { PostTypes } from "./Post";

function App() {
  const [posts, setPosts] = useState<any>([
    {
      username: "cleverprog",
      caption: "WOW it works",
      imageUrl: "http://picsum.photos/400/200",
    },
    {
      username: "cleverprog",
      caption: "WOW it works",
      imageUrl: "http://picsum.photos/400/200",
    },
  ]);
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="http://picsum.photos/300/50"
          alt=""
        />
      </div>
      <h1>
        HELLO Clever Programmers Let's build an Instagram Clone with React🚀!
      </h1>

      {posts.map((post: PostTypes) => {
        return (
          <Post
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        );
      })}

      {/* Header */}
      {/* Posts */}
      {/* Posts */}
    </div>
  );
}

export default App;
