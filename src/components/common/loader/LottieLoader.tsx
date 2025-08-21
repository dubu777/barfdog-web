import Lottie from "lottie-react";
import { lottieAnimation } from "./Loader.css";
import { commonWrapper } from "@/styles/common.css";

interface LottieLoaderProps {
  fullscreen?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const LottieLoader = ({
  fullscreen = false,
  size = "lg",
  className,
}: LottieLoaderProps) => {
  return (
    <div
      className={commonWrapper({
        height: fullscreen ? "fullWithHeader" : undefined,
      })}
    >
      <div className={lottieAnimation({ size })}>
        {" "}
        <Lottie
          animationData={require("/public/animations/loader.json")}
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default LottieLoader;
