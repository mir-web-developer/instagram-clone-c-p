import { Avatar } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { db } from "./firebase";
import "./Post.css";
import firebase from "firebase";

export type PostTypes = {
  username: string;
  caption: string;
  imageUrl: string;
  postId: string;
  user: any;
};

const Post: FC<PostTypes> = ({ user, username, caption, imageUrl, postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    //@ts-ignore
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          //@ts-ignore
          setComments(snapshot.docs.map((doc: any) => doc.data()));
        });
    }
    return () => {
      //@ts-ignore
      unsubscribe();
    };
  }, []);

  const postComment = (event: any) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
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
      <div className="post__comments">
        {comments.map((comment: any) => {
          return (
            <p>
              <strong>{comment.username}</strong>
              {comment.text}
            </p>
          );
        })}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            type="text"
            className="post__input"
            placeholder="add a comment ..."
            value={comment}
            onChange={(event) => setComment(event.currentTarget.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
