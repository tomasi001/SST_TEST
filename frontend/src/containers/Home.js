import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box textAlign="center">
      <Box py="80px" color="black">
        <Heading size="2xl" fontWeight="semibold" fontFamily="body">
          Scratch
        </Heading>
        <Text fontWeight="light" fontFamily="Open Sans, sans-serif" mt={2}>
          A simple note taking app
        </Text>
      </Box>
    </Box>
  );
}
