// CommentList.js
import React from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
//import { UserContext } from "../../Context/userContext";
//import data from "./data"

const CommentList = (props) => {
  //const { user } = React.useContext(UserContext);

  const commentNodes = props.data.map((comment) => (
    <Comment
      author={comment.author}
      email={comment.email}
      key={comment._id}
      id={comment._id}
      timestamp={comment.updatedAt}
      handleUpdateComment={props.handleUpdateComment}
      handleDeleteComment={props.handleDeleteComment}
    >
      {comment.text}
    </Comment>
  ));
  return <div>{commentNodes}</div>;
};

CommentList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      id: PropTypes.string,
      text: PropTypes.string,
      updatedAt: PropTypes.string,
    })
  ),
  handleDeleteComment: PropTypes.func.isRequired,
  handleUpdateComment: PropTypes.func.isRequired,
};

CommentList.defaultProps = {
  data: [],
};

export default CommentList;
