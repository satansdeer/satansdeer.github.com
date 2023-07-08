import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import * as prismicH from "@prismicio/helpers";
import Prism from "prismjs";
require("prismjs/components/prism-jsx");

const Markdown = ({ slice }) => {
  const text = prismicH.asText(slice.primary.text);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return <ReactMarkdown>{text}</ReactMarkdown>;
};

export default Markdown;
