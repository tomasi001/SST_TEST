import { Flex, FormLabel, Textarea } from "@chakra-ui/react";
import Error from "./error";

const TextAreaInput = ({
  label,
  type,
  id,
  register,
  required,
  errors,
  autoComplete,
  height,
  width,
  name,
}) => {
  return (
    <Flex mb={4} flexDir="column">
      <FormLabel
        _focus={{ color: "blue.500" }}
        _hover={{ color: "yellow.400" }}
      >
        {label}
      </FormLabel>
      <Textarea
        border="1px solid grey"
        _focus={{ borderColor: "blue.500" }}
        _hover={{ borderColor: "yellow.400" }}
        type={type}
        id={id}
        name={name}
        {...register(id, { required })}
        autoComplete={autoComplete}
        height={height && height}
        width={width && width}
      />
      {errors[id] && <Error label={label} />}
    </Flex>
  );
};

export default TextAreaInput;
