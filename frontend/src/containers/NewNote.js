import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { API } from "aws-amplify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormControl from "../components/FormComponents/formControl";
import InputField from "../components/FormComponents/input";
import TextAreaInput from "../components/FormComponents/textArea";
import StyledSubmitButton from "../components/StyledSubmitButton";
import config from "../config";
import { s3Upload } from "../lib/awsLib";
import { onError } from "../lib/errorLib";

const NewNote = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createNote = (note) => {
    return API.post("notes", "/notes", {
      body: note,
    });
  };

  const onSubmit = async (data) => {
    const file = data.file[0];
    console.log("first", data);
    if (file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }
    setIsLoading(true);

    try {
      const attachment = file ? await s3Upload(file) : null;

      await createNote({ content: data.content, attachment });
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  return (
    <Flex width="100vw" height="85vh" justifyContent="center">
      <FormControl handleSubmit={handleSubmit} onSubmit={onSubmit}>
        <TextAreaInput
          label="Content"
          type="textarea"
          id="content"
          register={register}
          required={true}
          errors={errors}
          autoComplete="content"
          height="50vh"
          width="80vw"
        />
        <InputField
          label="Attachment"
          type="file"
          id="file"
          register={register}
          required={true}
          errors={errors}
        />
        <StyledSubmitButton buttonText="Create" isLoading={isLoading} />
      </FormControl>
    </Flex>
  );
};
export default NewNote;
