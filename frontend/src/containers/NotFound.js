import { Box, Heading } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Box pt="100px" textAlign="center" color="black">
      <Heading letterSpacing="widest" size="4xl">
        404
      </Heading>
      <Heading letterSpacing="widest">Sorry, page not found!</Heading>
    </Box>
  );
}
