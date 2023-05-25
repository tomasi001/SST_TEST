import { Flex, Heading, IconButton, Link } from "@chakra-ui/react";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useDisclosure } from "@chakra-ui/react";

import HorizontalCollapse from "./HorizontalCollapse";

const CollapsibleContent = () => {
  return (
    <Flex
      width="100%"
      flexDir="row"
      color="black"
      justifyContent="space-between"
    >
      <Link href="/">
        <Heading mr={4} fontWeight="bold" color="gray.500" size="md">
          Scratch
        </Heading>
      </Link>
      <Flex>
        <Link href="/login" mr={4} fontSize="15">
          Login
        </Link>
        <Link href="/signup" fontSize="15">
          Signup
        </Link>
      </Flex>
    </Flex>
  );
};

const Navbar = () => {
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const [hidden, setHidden] = useState(!isOpen);
  const [isOpening, setIsOpening] = useState(false);

  return (
    <Flex justifyContent="flex-end" width="100%">
      <Flex
        bg="gray.100"
        alignItems="center"
        justifyContent="space-between"
        p={3}
        mb={3}
        borderRadius={10}
        width={isOpen ? "inherit" : "-moz-initial"}
        onClick={() => {
          setIsOpening(!isOpening);
        }}
      >
        <HorizontalCollapse
          isOpen={isOpen}
          getDisclosureProps={getDisclosureProps}
          hidden={hidden}
          setHidden={setHidden}
        >
          {isOpening && <CollapsibleContent />}
        </HorizontalCollapse>
        <IconButton
          aria-label="Toggle Navigation"
          icon={<FiMenu />}
          size="lg"
          colorScheme="white"
          {...getButtonProps()}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
