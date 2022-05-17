import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div>
      <div className="media mb-2">
        <img
          src={comment.profileImage}
          className="mr-3 img-fluid"
          style={{ minWidth: "10%", maxWidth: "10%" }}
          alt="..."
        />
        <div className="media-body">
          <h5 className="mt-0">{comment.fullname}</h5>
          <p>{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
