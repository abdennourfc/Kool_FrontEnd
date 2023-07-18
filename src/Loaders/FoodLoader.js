import React from 'react';
import Lottie from 'react-lottie';
import animationData from './animation.json';
import { Backdrop } from "@mui/material"

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <Backdrop
      sx={{ backgroundColor: "rgba(0, 0, 0, 0.3)", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <div>
        <Lottie options={defaultOptions} />
      </div>
    </Backdrop>
  );
};

export default LottieAnimation;
