import { Flex } from "@chakra-ui/react";
import Routes from "./Routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Flex minH="100vh" bg="white" p={3} alignItems="center" flexDir="column">
      <Navbar />
      <Routes />
    </Flex>
  );
}

export default App;
