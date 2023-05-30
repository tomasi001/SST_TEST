import { Box, Flex, Icon, Link, Spinner, Text } from "@chakra-ui/react";
import { API, Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPaperclip } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from "../components/FormComponents/formControl";
import InputField from "../components/FormComponents/input";
import TextAreaInput from "../components/FormComponents/textArea";
import StyledSubmitButton from "../components/StyledSubmitButton";
import config from "../config";
import { s3Upload } from "../lib/awsLib";
import { onError } from "../lib/errorLib";
import { formatFilename } from "../utils";

export default function ViewNote() {
  const { id } = useParams();
  const nav = useNavigate();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  function loadNote() {
    return API.get("notes", `/notes/${id}`);
  }

  async function onLoad() {
    try {
      const note = await loadNote();
      const { content, attachment } = note;

      setValue("content", content);

      if (attachment) {
        note.attachmentURL = await Storage.vault.get(attachment);
      }

      setNote(note);
    } catch (e) {
      onError(e);
    }
  }

  useEffect(() => {
    onLoad();
  }, [id]);

  function saveNote(note) {
    return API.put("notes", `/notes/${id}`, {
      body: note,
    });
  }

  function deleteNote() {
    return API.del("notes", `/notes/${id}`);
  }

  async function removeAttachment(attachmentKey) {
    await Storage.vault.remove(attachmentKey);
  }

  async function onSubmit(data) {
    const file = data.file[0];

    if (file?.size > config.MAX_ATTACHMENT_SIZE) {
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

      if (attachment) {
        await removeAttachment(note.attachment);
      }

      await saveNote({
        content: data.content,
        attachment: attachment || note.attachment,
      });
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      setIsDeleting(false);
      return;
    }

    if (confirmed) {
      try {
        await deleteNote();
        if (note.attachment) {
          await removeAttachment(note.attachment);
        }
        nav("/");
      } catch (error) {
        onError(error);
      }
      setIsDeleting(false);
    }
  }

  return (
    <Flex width="100vw" height="85vh" justifyContent="center">
      {note ? (
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
            name="content"
          />
          {note.attachment && (
            <Link
              _focus={{ color: "blue.500" }}
              _hover={{ color: "yellow.400" }}
              href={note.attachmentURL}
            >
              <Flex justifyContent="center" alignItems="center" flexDir="row">
                <Icon as={FaPaperclip} />
                <Text fontSize="20px" ml={4}>
                  {formatFilename(note.attachment)}
                </Text>
              </Flex>
            </Link>
          )}
          <InputField
            label="Attachment"
            type="file"
            id="file"
            register={register}
            required={false}
            errors={errors}
            name="file"
          />
          <StyledSubmitButton
            buttonText="Update"
            isLoading={isLoading}
            onHoverColor="green.500"
          />
          <StyledSubmitButton
            my={4}
            onHoverColor="red.500"
            buttonText="Delete"
            isLoading={isDeleting}
            type="button"
            onClick={handleDelete}
          />
        </FormControl>
      ) : (
        <Box position="absolute" left="45vw" top="50vh" mt={10} ml={20}>
          <Spinner size="lg" />
        </Box>
      )}
    </Flex>
  );
}
