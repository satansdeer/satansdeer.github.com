import React from "react";
import { PrismicRichText } from "@prismicio/react";

const TextBlock = ({ slice }) => {
  return <PrismicRichText field={slice.primary.text} />;
};

export default TextBlock;
