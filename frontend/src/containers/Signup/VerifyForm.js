import { Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormControl from "../../components/FormComponents/formControl";
import InputField from "../../components/FormComponents/input";
import StyledSubmitButton from "../../components/StyledSubmitButton";
import { useAppContext } from "../../lib/contextLib";
import { onError } from "../../lib/errorLib";
import { confirmationCodeSchema } from "../../utils/validation/index";

const VerifyForm = ({ credentials, isLoading, setIsLoading }) => {
  const nav = useNavigate();
  const { userHasAuthenticated } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(confirmationCodeSchema),
  });

  async function onSubmit(data) {
    console.log(credentials, data);
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(credentials.email, data.confirmationCode);
      await Auth.signIn(credentials.email, credentials.password);
      userHasAuthenticated(true);
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <FormControl handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <Text
        _focus={{ borderColor: "blue.500" }}
        _hover={{ borderColor: "yellow.400" }}
      >
        Please check your email for the code.
      </Text>
      <br />
      <InputField
        label="Confirmation Code"
        type="tel"
        id="confirmationCode"
        register={register}
        required={true}
        errors={errors}
      />

      <StyledSubmitButton buttonText="Verify" isLoading={isLoading} />
    </FormControl>
  );
};

export default VerifyForm;
