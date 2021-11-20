import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Markup } from "interweave";

const useStyles = makeStyles((theme) => ({
  desc: {
    fontFamily: "Caslon,serif",
    marginTop: "40px",

    // "& p::first-letter": {
    //   fontSize: "125px",
    //   backgroundColor: "#363f48",
    //   color: "#fff",
    //   float: "left",
    //   padding: "0px 10px",

    //   marginRight: "10px",
    //   marginTop: "10px",
    //   lineHeight: "0.9",
    // },
    [theme.breakpoints.down("md")]: {
      maxWidth: "74%",
      marginTop: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      marginTop: "30px",
      maxWidth: "70%",
    },
    color: "#222",
    fontSize: "26px",
    lineHeight: "1.4",
    height: "auto",
    width: "60%",
    maxWidth: "80%",
    display: "flex",
    margin: "0 auto",
    wordWrap: "break-word",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "700px",
      height: "auto",
      padding: "10px",
      margin: "30px 0px",

      [theme.breakpoints.down("sm")]: {
        width: "500px",
        height: "auto",
      },
      [theme.breakpoints.down("xs")]: {
        width: "300px",
        height: "auto",
        padding: "5px",
      },
    },
    "& h1,h2,h3,h4": {
      color: "#363f48",
      textTransform: "capitalize",
    },
    "& h1": {
      textAlign: "center",
    },
  },
  raw: {
    background: "#EEEEF0",
    border: "1px solid #ccc",
    padding: "20px",
  },

  undererdList: {
    width: "100%",
    padding: "0px",
    marginTop: "10px",
  },
  ordererdList: {
    width: "100%",
    padding: "0px",
    marginTop: "10px",
  },
}));

const DesciptionTest = ({ blockContent }) => {
  const classes = useStyles();
  // const [singlePost, setSinglePost] = useState({});

  return (
    <div className={classes.desc}>
      {blockContent &&
        blockContent.map((el) => {
          if (el.type == "header") {
            if (el.data.level === 1) {
              return <h1>{el.data.text}</h1>;
            } else if (el.data.level === 2) {
              return <h2>{el.data.text}</h2>;
            } else if (el.data.level === 3) {
              return <h3>{el.data.text}</h3>;
            } else if (el.data.level === 4) {
              return <h4>{el.data.text}</h4>;
            }
          } else if (el.type == "paragraph") {
            return <Markup content={el.data.text} />;
          } else if (el.type == "quote") {
            return (
              <div>
                <p style={{ fontSize: "28px" }}>{el.data.caption}</p>
                <blockquote style={{ fontStyle: "italic", fontSize: "30px" }}>
                  ❝ {el.data.text} ❞
                </blockquote>
              </div>
            );
          } else if (el.type == "list") {
            if (el.data.style === "ordered") {
              return (
                <ol className={classes.ordererdList}>
                  {el.data.items.map((el) => (
                    <li style={{ width: "90%", marginTop: "8px" }}>{el}</li>
                  ))}
                </ol>
              );
            } else if (el.data.style === "unordered") {
              return (
                <ul className={classes.undererdList}>
                  {el.data.items.map((el) => (
                    <li style={{ width: "90%", marginTop: "8px" }}>{el}</li>
                  ))}
                </ul>
              );
            }
          } else if (el.type == "image") {
            return <img src={el.data.url} />;
          } else if (el.type == "raw") {
            return (
              <div className={classes.raw}>
                <code>{el.data.html}</code>
              </div>
            );
          }
        })}
    </div>
  );
};

export default DesciptionTest;
