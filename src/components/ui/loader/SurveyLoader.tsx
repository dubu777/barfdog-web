"use client";

import Lottie from "lottie-react";
import { lottieAnimation } from "./Loader.css";
import { commonWrapper } from "@/styles/common.css";
import animationData from "public/animations/loader.json";

interface SurveyLoaderProps {
  fullscreen?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function SurveyLoader({
  fullscreen = false,
  size = "lg",
}: SurveyLoaderProps) {
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
}
