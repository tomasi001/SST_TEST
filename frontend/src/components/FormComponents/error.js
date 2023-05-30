import { Text } from "@chakra-ui/react";

const Error = ({ label }) => {
  return <Text color="red.500">{`${label} is required`}</Text>;
};

export default Error;
