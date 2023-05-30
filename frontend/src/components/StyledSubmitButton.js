import { Button, Text } from "@chakra-ui/react";

const StyledSubmitButton = ({
  buttonText,
  isLoading,
  mt,
  my,
  onHoverColor,
  type,
  onClick,
}) => {
  return (
    <Button
      width="100%"
      border="1px solid grey"
      type={type ? type : "submit"}
      isLoading={isLoading}
      size={"lg"}
      _focus={{ borderColor: "blue.500" }}
      _hover={{ borderColor: onHoverColor ? onHoverColor : "yellow.400" }}
      mt={mt && mt}
      my={my && my}
      onClick={onClick && onClick}
    >
      <Text
        _focus={{ backgroundColor: onHoverColor ? onHoverColor : "blue.500" }}
        _hover={{ color: onHoverColor ? onHoverColor : "yellow.400" }}
      >
        {buttonText}
      </Text>
    </Button>
  );
};

export default StyledSubmitButton;
