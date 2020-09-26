import { Avatar } from "@material-ui/core";
import React, { FC } from "react";
import "./Post.css";

export type PostTypes = {
  username: string;
  caption: string;
  imageUrl: string;
};

const Post: FC<PostTypes> = ({ username, caption, imageUrl }) => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="DjalilovMirjaxon" src="">
          {/* //@ts-ignore */}
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt="" />

      <h4 className="post__text">
        {" "}
        <strong>{username}</strong>
        {caption}
      </h4>
    </div>
  );
};

export default Post;
