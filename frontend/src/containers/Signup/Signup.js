import { Box } from "@chakra-ui/react";
import { useState } from "react";
import SignupForm from "./SignupForm";
import VerifyForm from "./VerifyForm";

const Signup = () => {
  const [newUser, setNewUser] = useState(null);
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box p="60px">
      {!newUser ? (
        <SignupForm
          setCredentials={setCredentials}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setNewUser={setNewUser}
        />
      ) : (
        <VerifyForm
          credentials={credentials}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </Box>
  );
};

export default Signup;
