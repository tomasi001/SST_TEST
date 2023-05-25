import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: '"Open Sans", sans-serif',
    heading: '"PT Serif", serif',
  },
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0,
        color: "#333",
        fontSize: "16px",
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
      },
      "h1, h2, h3, h4, h5, h6": {
        fontFamily: "heading",
      },
      input: {
        fontSize: "16px",
      },
      textarea: {
        fontSize: "16px",
      },
      select: {
        fontSize: "16px",
      },
      "input[type='file']": {
        width: "100%",
      },
    },
  },
});

export default theme;
