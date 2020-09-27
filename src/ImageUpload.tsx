import { Button } from "@material-ui/core";
import firebase from "firebase";
import React, { useState } from "react";
import { db, storage } from "./firebase";
import  './ImageUpload.css'

const ImageUpload = ({ username }: any) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e: any) => {
    if (e.currentTarget.files[0]) {
      setImage(e.currentTarget.files[0]);
    }
  };

  const handleUpload = () => {
    //@ts-ignore
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error: any) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function ...
        //@ts-ignore
        storage
          .ref("images")
          //@ts-ignore
          .child(image.name)
          .getDownloadURL()
          .then((url: any) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption ..."
        onChange={(event: any) => setCaption(event.currentTarget.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
