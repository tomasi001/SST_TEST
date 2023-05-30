import { Flex } from "@chakra-ui/react";
import Routes from "./Routes";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { AppContext } from "./lib/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./lib/errorLib";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }
  return (
    !isAuthenticating && (
      <Flex minH="100vh" bg="white" p={3} alignItems="center" flexDir="column">
        <Navbar
          isAuthenticated={isAuthenticated}
          userHasAuthenticated={userHasAuthenticated}
        />
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </Flex>
    )
  );
}

export default App;
