import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))",
    gridAutoRows: "200px"
  }
}));

const ImageItem = ({ image }) => <img src={image.url} alt="" />;

export default function ImageList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} id="grid">
      {props.images.map(image => (
        <div className="item">
          <div className="content">
            <ImageItem key={image.uid} image={image} />
          </div>
        </div>
      ))}
    </div>
  );
}
