import React from 'react'
import ReactMarkdown from "react-markdown";
import * as prismicH from "@prismicio/helpers";

const Markdown = ({ slice }) => {
	const text = prismicH.asText(slice.primary.text)

  return <ReactMarkdown children={text}/>
}

export default Markdown
