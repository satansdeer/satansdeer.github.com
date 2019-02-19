import Typography from "typography";
import lincoln from "typography-theme-lincoln";

lincoln.overrideThemeStyles = () => ({
  "a.gatsby-resp-image-link": {
    backgroundImage: "none"
  },
  "h1, h2, h3, h4, h5, h6": {
    fontFamily:
      "-apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica,helvetica neue,ubuntu,roboto,noto,segoe ui,arial,sans-serif"
  },
  body: {
    fontFamily:
      "-apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica,helvetica neue,ubuntu,roboto,noto,segoe ui,arial,sans-serif"
  }
});

const typography = new Typography(lincoln);

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
