import IndexPageNavbar from "@/components/IndexPageNavbar";
import { Logo } from "@/components/Logo";
import {
  Container,
  Stack,
  Alert,
  AlertIcon,
  Heading,
  SlideFade,
  Text,
  HStack,
  PinInput,
  PinInputField,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { BsDashLg } from "react-icons/bs";
import { API_URL } from "./_app";
import { useRouter } from "next/router";

// Page used for users accepting an invite to a company
const Verify = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const toast = useToast();
  const router = useRouter();
  // Automatically convert to uppercase
  const handleInputChange = (event: any, inputIndex: any) => {
    setIsInvalid(false);
    const inputValue = event.target.value;
    const uppercaseValue = inputValue.toUpperCase();
    event.target.value = uppercaseValue;
  };

  // Submit code to server
  const handleSubmitCode = async (code: string) => {
    setIsDisabled(true);
    const response = await fetch(`${API_URL}/company/invite`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    });

    if (response.status !== 200) {
      toast({
        title: "Invalid code.",
        position: "top",
        description: "The code you entered is invalid. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsInvalid(true);
      setIsDisabled(false);
      return;
    }

    // Receive and set checkpoint token and move to next step
    const json = await response.json();
    localStorage.setItem("checkpoint_token", json.checkpoint_token);
    router.push("/setpassword", undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>Taskify | Verify</title>
      </Head>
      <IndexPageNavbar />
      <SlideFade in={true}>
        <Container maxW="md" py={{ base: "12", md: "24" }}>
          <Stack spacing="8" align="center">
            <Logo boxSize="4rem" />
            <Heading size={{ base: "xs", md: "sm" }}>
              Join an organization
            </Heading>
            <Text>Enter the code we emailed you here.</Text>

            <HStack>
              <PinInput
                type="alphanumeric"
                size="lg"
                colorScheme="gray"
                placeholder=""
                isDisabled={isDisabled}
                isInvalid={isInvalid}
                onComplete={handleSubmitCode}
              >
                <PinInputField
                  onChange={(event) => handleInputChange(event, 0)}
                  style={{ border: "1px solid gray", background: "#f8f8f8" }}
                />
                <PinInputField
                  onChange={(event) => handleInputChange(event, 1)}
                  style={{ border: "1px solid gray", background: "#f8f8f8" }}
                />
                <PinInputField
                  onChange={(event) => handleInputChange(event, 2)}
                  style={{ border: "1px solid gray", background: "#f8f8f8" }}
                />
                <PinInputField
                  onChange={(event) => handleInputChange(event, 3)}
                  style={{ border: "1px solid gray", background: "#f8f8f8" }}
                />
                <BsDashLg
                  style={{
                    alignSelf: "center",
                    fontSize: "1.3rem",
                    color: "gray",
                  }}
                />
                <PinInputField
                  onChange={(event) => handleInputChange(event, 4)}
                  style={{ border: "1px solid gray", background: "#f8f8f8" }}
                />
                <PinInputField
                  onChange={(event) => handleInputChange(event, 5)}
                  style={{ border: "1px solid gray", background: "#f8f8f8" }}
                />
                <PinInputField
                  onChange={(event) => handleInputChange(event, 6)}
                  style={{ border: "1px solid gray", background: "#f8f8f8" }}
                />
                <PinInputField
                  onChange={(event) => handleInputChange(event, 7)}
                  style={{ border: "1px solid gray", background: "#f8f8f8" }}
                />
              </PinInput>
            </HStack>
          </Stack>
        </Container>
      </SlideFade>
    </>
  );
};

export default Verify;
