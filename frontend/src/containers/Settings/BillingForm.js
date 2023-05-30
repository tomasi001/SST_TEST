import { Box, FormLabel } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormControl from "../../components/FormComponents/formControl";
import InputField from "../../components/FormComponents/input";
import StyledSubmitButton from "../../components/StyledSubmitButton";
import { billingFormValidationSchema } from "../../utils/validation/index";
import "./BillingForm.css";

export default function BillingForm({ isLoading, onSubmit }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  isLoading = isProcessing || isLoading;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(billingFormValidationSchema),
  });

  async function handleSubmitClick(data) {
    if (!stripe || !elements || !isCardComplete) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    setIsProcessing(false);

    onSubmit(data.storage, { token, error });
  }

  return (
    <Box p="60px">
      <FormControl handleSubmit={handleSubmit} onSubmit={handleSubmitClick}>
        <InputField
          label="Number of notes to store"
          type="number"
          id="storage"
          register={register}
          required={true}
          errors={errors}
          autoComplete="storage"
        />
        <InputField
          label="Card Holder's Name"
          type="text"
          id="cardHolder"
          register={register}
          required={true}
          errors={errors}
          autoComplete="cardHolder"
        />

        <FormLabel
          _focus={{ color: "blue.500" }}
          _hover={{ color: "yellow.400" }}
        >
          Credit Card Info
        </FormLabel>
        <CardElement
          className="card-field"
          onChange={(e) => {
            console.log(e);
            setIsCardComplete(e.complete);
          }}
          options={{
            style: {
              base: {
                fontSize: "16px",
                fontWeight: "400",
                color: "#495057",
                fontFamily: "'Open Sans', sans-serif",
              },
            },
          }}
        />

        {/* <Flex flexDir="row" justifyContent="space-between">
          <Flex width="80%" flexDir="row" justifyContent="space-between">
            <InputField
              label="Card Number"
              type="text"
              id="cardNumber"
              register={register}
              required={true}
              errors={errors}
              autoComplete="cardNumber"
              width="70%"
            />
            <InputField
              label="Expiry Date"
              type="text"
              id="expiryDate"
              register={register}
              required={true}
              errors={errors}
              autoComplete="expiryDate"
              width="25%"
            />
          </Flex>
          <InputField
            label="CVV"
            type="text"
            id="cvv"
            register={register}
            required={true}
            errors={errors}
            autoComplete="cvv"
            width="18%"
          />
        </Flex>
        <InputField
          label="Card Pin"
          type="text"
          id="pin"
          register={register}
          required={true}
          errors={errors}
          autoComplete="pin"
          width="20%"
        /> */}
        <StyledSubmitButton buttonText="Purchase" isLoading={isLoading} />
      </FormControl>
    </Box>
  );
}
