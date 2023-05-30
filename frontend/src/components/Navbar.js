import { Flex, Heading, IconButton, Link } from "@chakra-ui/react";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useDisclosure } from "@chakra-ui/react";
import HorizontalCollapse from "./HorizontalCollapse";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const CollapsibleContent = ({
  isAuthenticated,
  userHasAuthenticated,
  onToggle,
  setIsOpening,
}) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    onToggle();
    setIsOpening(false);
    await Auth.signOut();
    userHasAuthenticated(false);
    navigate("/login");
  };
  return (
    <Flex
      width="100%"
      flexDir="row"
      color="black"
      justifyContent="space-between"
    >
      <Link
        href="/"
        _focus={{ color: "blue.500" }}
        _hover={{ color: "yellow.400" }}
      >
        <Heading
          mr={4}
          fontWeight="bold"
          size="md"
          onClick={() => {
            onToggle();
            setIsOpening(false);
          }}
        >
          Scratch
        </Heading>
      </Link>
      {isAuthenticated ? (
        <Flex>
          <Link
            href="/settings"
            _focus={{ color: "blue.500" }}
            _hover={{ color: "yellow.400" }}
            mr={4}
            fontSize="15"
            onClick={() => {
              onToggle();
              setIsOpening(false);
            }}
          >
            Settings
          </Link>
          <Link
            _focus={{ color: "blue.500" }}
            _hover={{ color: "yellow.400" }}
            onClick={handleLogout}
            mr={4}
            fontSize="15"
          >
            Logout
          </Link>
        </Flex>
      ) : (
        <Flex>
          <Link
            _focus={{ color: "blue.500" }}
            _hover={{ color: "yellow.400" }}
            href="/login"
            onClick={() => {
              onToggle();
              setIsOpening(false);
            }}
            mr={4}
            fontSize="15"
          >
            Login
          </Link>
          <Link
            _focus={{ color: "blue.500" }}
            _hover={{ color: "yellow.400" }}
            href="/signup"
            onClick={() => {
              onToggle();
              setIsOpening(false);
            }}
            fontSize="15"
          >
            Signup
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

const Navbar = ({ isAuthenticated, userHasAuthenticated }) => {
  const { getButtonProps, getDisclosureProps, isOpen, onToggle } =
    useDisclosure();
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
      >
        <HorizontalCollapse
          isOpen={isOpen}
          getDisclosureProps={getDisclosureProps}
          hidden={hidden}
          setHidden={setHidden}
        >
          {isOpening && (
            <CollapsibleContent
              isAuthenticated={isAuthenticated}
              userHasAuthenticated={userHasAuthenticated}
              onToggle={onToggle}
              setIsOpening={setIsOpening}
            />
          )}
        </HorizontalCollapse>
        <Flex
          onClick={() => {
            setIsOpening(!isOpening);
          }}
        >
          <IconButton
            aria-label="Toggle Navigation"
            icon={<FiMenu />}
            size="lg"
            colorScheme="white"
            _hover={{ color: "yellow.400" }}
            {...getButtonProps()}
            onAnimationStart={() => {
              setIsOpening(!isOpening);
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
