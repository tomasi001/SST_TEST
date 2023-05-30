import { yupResolver } from "@hookform/resolvers/yup";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import FormControl from "../../components/FormComponents/formControl";
import InputField from "../../components/FormComponents/input";
import StyledSubmitButton from "../../components/StyledSubmitButton";
import { onError } from "../../lib/errorLib";
import { signupValidationSchema } from "../../utils/validation/index";

const SignupForm = ({
  setCredentials,
  isLoading,
  setIsLoading,
  setNewUser,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
  });

  async function onSubmit(data) {
    setCredentials({ email: data.email, password: data.password });
    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: data.email,
        password: data.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      if (e.code === "UsernameExistsException") {
        try {
          const newUser = await Auth.resendSignUp(data.email);
          setNewUser(newUser);
          setIsLoading(false);
          // Display a message to the user indicating that the confirmation code has been resent.
        } catch (resendError) {
          onError(resendError);
        }
      } else {
        onError(e);
      }
      setIsLoading(false);
    }
  }
  return (
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
      <InputField
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        register={register}
        required={true}
        errors={errors}
        autoComplete="confirm-password"
      />

      <StyledSubmitButton buttonText="Signup" isLoading={isLoading} />
    </FormControl>
  );
};

export default SignupForm;
