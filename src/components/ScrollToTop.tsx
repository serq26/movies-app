import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ScrollToTop = (props: any) => {
  const [show, setShow] = useState(props.showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > props.showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
    if (props.showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });

  return (
    <div>
      {show && (
        <IconButton
          onClick={handleClick}
          style={{
            zIndex: 2,
            position: "fixed",
            bottom: "2vh",
            backgroundColor: "#DCDCDC",
            color: "black",
            right:10,
          }}
          aria-label="to top"
          component="span"
        >
          <ExpandLessIcon />
        </IconButton>
      )}
    </div>
  );
};

export default ScrollToTop;
