import React from "react";
import CommentCard from "./CommentCard";

const Comments = ({ comments }) => {
  return (
    <div>
      {comments.length > 0 &&
        comments.map((comment) => {
          return <CommentCard comment={comment} key={comment.id} />;
        })}

      {comments.length === 0 && <p>No comments added yet!</p>}
    </div>
  );
};

export default Comments;
