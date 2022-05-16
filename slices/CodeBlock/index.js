import React, { useEffect } from "react";
import Prism from "prismjs";
require("prismjs/components/prism-jsx");

const CodeBlock = ({ slice }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
		<div className="mt-12 mb-20">
    <pre tabIndex="0" className={`rounded-lg font-mono language-${slice.primary.language}`}>
      <code className={`language-${slice.primary.language}`}>
        {slice.primary.text}
      </code>
    </pre>
		</div>
  );
};

export default CodeBlock;
