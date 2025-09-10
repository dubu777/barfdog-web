"use client";

import Lottie from "lottie-react";
import { lottieAnimation } from "./Loader.css";
import { commonWrapper } from "@/styles/common.css";
import animationData from "public/animations/loader.json";

interface LottieLoaderProps {
  fullscreen?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const LottieLoader = ({
  fullscreen = false,
  size = "lg",
}: LottieLoaderProps) => {
  return (
    <div
      className={commonWrapper({
        height: fullscreen ? "fullWithHeader" : undefined,
      })}
    >
      <div className={lottieAnimation({ size })}>
        {" "}
        <Lottie animationData={animationData} loop autoplay />
      </div>
    </div>
  );
};

export default LottieLoader;
