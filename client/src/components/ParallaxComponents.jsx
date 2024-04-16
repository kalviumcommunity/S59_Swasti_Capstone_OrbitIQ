import React from "react";
import Image from "../assets/Image1.jpg";
import Image2 from "../assets/Image2.jpeg";
import Parallax from "./Parallax";
import TextBox from "./TextBox";

export default function Image1() {
  return (
    <>
      <TextBox />
      <Parallax imageUrl={Image} />
      <TextBox />
      <Parallax imageUrl={Image2} />
    </>
  );
}
