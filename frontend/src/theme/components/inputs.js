import { defineStyleConfig } from "@chakra-ui/react";

export const inputTheme = defineStyleConfig({
  baseStyle: {
    control: {
      borderRadius: "md",
      borderColor: "gray.400",
      border: "1px",
    },
  },
  defaultProps: {
    // colorScheme: 'black',
    size: "lg",
  },
});
