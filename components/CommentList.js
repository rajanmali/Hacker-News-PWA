import Comment from "./Comment";
import PropTypes from "prop-types";

const CommentList = ({ comments }) => (
  <>
    {comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </>
);

CommentList.propTypes = {
  comments: PropTypes.array,
};

export default CommentList;
