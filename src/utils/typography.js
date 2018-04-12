import Typography from "typography";
import lincoln from "typography-theme-lincoln";

lincoln.overrideThemeStyles = () => ({
  "a.gatsby-resp-image-link": {
    backgroundImage: "none"
  }
});

const typography = new Typography(lincoln);

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
