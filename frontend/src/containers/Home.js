import {
  Box,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { BsCheckCircle, BsPencilSquare } from "react-icons/bs";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      const notes = await loadNotes();
      console.log(notes);
      setNotes(notes);
    } catch (e) {
      onError(e);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function renderLander() {
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

  function renderNotes() {
    return (
      <Box width="85%">
        <Heading as="h2" pb={3} mt={4} mb={3} borderBottom="1px solid">
          Your Notes
        </Heading>
        <List>
          <ListItem
            cursor="pointer"
            py={3}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            display="flex"
            alignItems="center"
            p={4}
          >
            <ListIcon as={BsPencilSquare} boxSize={4} />
            <Link
              href="/notes/new"
              _focus={{ color: "blue.500" }}
              _hover={{ color: "yellow.400" }}
              mr={4}
              fontSize="15"
            >
              Create a new note
            </Link>
          </ListItem>
          {!isLoading ? (
            <>
              {notes.map((note) => (
                <Link
                  href={`/notes/${note.noteId}`}
                  _focus={{ color: "blue.500" }}
                  _hover={{ color: "yellow.400" }}
                  fontSize="15"
                  key={note.noteId}
                >
                  <Flex
                    flexDir="column"
                    borderBottom="1px solid black"
                    borderBottomRadius={8}
                    p={4}
                  >
                    <ListItem width="100%">
                      <ListIcon as={BsCheckCircle} color="green.500" />
                      <Flex ml={5} flexDir="row" justifyContent="space-between">
                        <Text> {note.content}</Text>
                        <Text>
                          {" "}
                          {new Date(note.createdAt).toLocaleString()}
                        </Text>
                      </Flex>
                    </ListItem>
                  </Flex>
                </Link>
              ))}
            </>
          ) : (
            <Box position="absolute" left="45vw" top="50vh" mt={10} ml={20}>
              <Spinner size="lg" />
            </Box>
          )}
        </List>
      </Box>
    );
  }

  return <>{isAuthenticated ? renderNotes() : renderLander()}</>;
}
