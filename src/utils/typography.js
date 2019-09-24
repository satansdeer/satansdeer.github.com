import Typography from "typography";
import lincoln from "typography-theme-lincoln";

lincoln.overrideThemeStyles = () => ({
  ':not(pre) > code[class*="language-"]': {
    background: 'linear-gradient( rgba(0,0,0,0) 0% 40%,#fbf07b 40%, 30%, #fbf07b 100%) !important',
    border: 'none !important'
  },
  "pre": {
    border: 'none !important',
    borderRadius: '6px'
  },
  "a": {
    backgroundImage: "none",
    textShadow: "none"
  },
  "a.gatsby-resp-image-link": {
    backgroundImage: "none",
    textShadow: "none"
  },
  "h1, h2, h3, h4, h5, h6": {
    fontFamily:
      "-apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica,helvetica neue,ubuntu,roboto,noto,segoe ui,arial,sans-serif",
    marginTop: ".79rem"
  },
  "h1": {
    fontWeight: 800
  },
  '@media screen and (max-width: 760px){aside{display:none}}': {},
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
