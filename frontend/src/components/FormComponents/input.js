import { Flex, FormLabel, Input } from "@chakra-ui/react";
import Error from "./error";

const InputField = ({
  label,
  type,
  id,
  register,
  required,
  errors,
  autoComplete,
  width,
  pl,
}) => {
  return (
    <Flex width={width && width} pl={pl && pl} mb={4} flexDir="column">
      <FormLabel
        _focus={{ color: "blue.500" }}
        _hover={{ color: "yellow.400" }}
      >
        {label}
      </FormLabel>
      <Input
        border="1px solid grey"
        _focus={{ borderColor: "blue.500" }}
        _hover={{ borderColor: "yellow.400" }}
        type={type}
        id={id}
        {...register(id, { required })}
        autoComplete={autoComplete}
      />
      {errors[id] && <Error label={label} />}
    </Flex>
  );
};

export default InputField;
