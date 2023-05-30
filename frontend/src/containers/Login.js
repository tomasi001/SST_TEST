import { Box } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormControl from "../components/FormComponents/formControl";
import InputField from "../components/FormComponents/input";
import StyledSubmitButton from "../components/StyledSubmitButton";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
import { loginValidationSchema } from "../utils/validation/index";

const Login = () => {
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      await Auth.signIn(data.email, data.password);
      userHasAuthenticated(true);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <Box p="60px">
      <FormControl handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <InputField
          label="Email"
          type="email"
          id="email"
          register={register}
          required={true}
          errors={errors}
          autoComplete="username"
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          register={register}
          required={true}
          errors={errors}
          autoComplete="current-password"
        />
        <StyledSubmitButton buttonText="Login" isLoading={isLoading} />
      </FormControl>
    </Box>
  );
};

export default Login;
