import { Parallax } from "react-parallax";

import React from "react";

export default function ParallaxComponent({ imageUrl }) {
  return (
    <Parallax className="image" bgImage={imageUrl} strength={800}></Parallax>
  );
}
