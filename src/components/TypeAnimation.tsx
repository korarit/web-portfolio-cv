"use client";
import { TypeAnimation } from "react-type-animation";

export default function TypeAnimationComponent() {
  return (
    <TypeAnimation
        sequence={[
            // Same substring at the start will only be typed once, initially
            "Software Engineer",
            5000,
            "Full-Stack Developer",
            3000,
            "Back-End Developer",
            3000,
            "Front-End Developer",
            3000,
        ]}
        speed={50}
        className="text-[24px] font-normal text-[#4D5BCE] leading-6"
        repeat={Infinity}
    />
  );
}
