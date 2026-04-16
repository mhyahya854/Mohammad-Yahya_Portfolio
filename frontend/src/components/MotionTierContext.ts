import { createContext } from "react";
import { DEFAULT_MOTION_ENVIRONMENT, MotionEnvironment } from "@/lib/motion-tier";

export const MotionTierContext = createContext<MotionEnvironment>(DEFAULT_MOTION_ENVIRONMENT);
