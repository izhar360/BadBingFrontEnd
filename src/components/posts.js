import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PostsContext } from "../Context/blogContext";
import SortedPosts from "./postsFilter";
import CircularProgress from "@mui/material/CircularProgress";
/**
 * @author
 * @function Posts
 **/

const useStyles = makeStyles((theme) => ({
  postMain: {
    width: "80%",
    margin: "0px auto",
    textAlign: "center",
  },
  h2: {
    fontSize: "45px",
    marginTop: "0",
    paddingTop: "40px",
  },
}));

const Posts = (props) => {
  const classes = useStyles();
  const { Posts, loading, error } = React.useContext(PostsContext);

  return (
    <div style={{ backgroundColor: "#E6E7E8" }}>
      <div className={classes.postMain}>
        <h2 className={classes.h2}>RECENT ARTICLES</h2>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          {" "}
          <CircularProgress size={60} color="inherit" />
        </div>
      ) : (
        <SortedPosts data={Posts.reverse()} />
      )}
      {error && <h2 style={{ textAlign: "center" }}>{"Network Error"}</h2>}
    </div>
  );
};

export default Posts;
