import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";

require("prismjs/components/prism-bash");
require("prismjs/components/prism-css");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-json");
require("prismjs/components/prism-markdown");
require("prismjs/components/prism-typescript");

const normalizeImageSrc = (src) => {
  if (!src) {
    return src;
  }

  return src.startsWith("./") ? src.slice(2) : src;
};

export const MarkdownContent = ({ children }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <ReactMarkdown
      components={{
        a: ({ href, children, ...props }) => {
          const isExternal = href && /^https?:\/\//.test(href);

          if (isExternal) {
            return (
              <a href={href} {...props} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          }

          return (
            <a href={href} {...props}>
              {children}
            </a>
          );
        },
        img: ({ src, alt, ...props }) => (
          <img
            src={normalizeImageSrc(src)}
            alt={alt || ""}
            loading="lazy"
            className="rounded-md"
            {...props}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
