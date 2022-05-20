import React from "react";
import { PrismicImage, PrismicRichText } from "@prismicio/react";

const Image = ({ slice }) => (
  <section>
    <PrismicImage field={slice.primary.src} />
    <PrismicRichText field={slice.primary.description} />
    <style jsx>{`
      section {
        max-width: 600px;
        margin: 4em auto;
        text-align: center;
      }
      .title {
        color: #8592e0;
      }
    `}</style>
  </section>
);

export default Image;
