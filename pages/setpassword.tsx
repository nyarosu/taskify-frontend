import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  SlideFade,
  Stack,
  Text,
} from "@chakra-ui/react";
import IndexPageNavbar from "@/components/IndexPageNavbar";
import { Logo } from "@/components/Logo";
import Head from "next/head";
import { useRouter } from "next/router";
import { API_URL } from "./_app";
import { useAppDispatch } from "@/utils/redux_hooks";
import { createLoginAction } from "@/utils/store";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.lazy((value) =>
    Yup.string().oneOf([value, null], "Passwords must match")
  ),
});

const SetPassword = () => {
  const router = useRouter();
  const dispatcher = useAppDispatch();
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [registerErrorText, setRegisterErrorText] = useState("");

  // This page should only be accessible to those that are checkpointed
  useEffect(() => {
    const token = localStorage.getItem("checkpoint_token");
    if (!token) {
      router.push("/", undefined, { shallow: true });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: any) {
    setIsRegistering(true);
    setRegisterError(false);
    console.log(values);
    const response = await fetch(`${API_URL}/user/password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("checkpoint_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status === 200) {
      // Session cookie has been set, so they can be redirected to dashboard
      setIsRegistering(false);
      setRegisterError(false);
      const json = await response.json();
      dispatcher(createLoginAction(json));
      router.push("/dashboard", undefined, { shallow: true });
    } else if (response.status === 400) {
      setIsRegistering(false);
      setRegisterError(true);
      setRegisterErrorText("Invalid password");
    } else {
      setIsRegistering(false);
      setRegisterError(true);
      setRegisterErrorText("Unauthorized.");
    }
  }

  return (
    <>
      <Head>
        <title>Taskify | Set Password</title>
      </Head>
      <IndexPageNavbar />
      <SlideFade in={true}>
        <Container maxW="md" py={{ base: "12", md: "24" }}>
          <Stack spacing="8" align="center">
            <Logo boxSize="4rem" />
            <Heading size={{ base: "xs", md: "sm" }}>Set password</Heading>
            <Text>Almost good to go - just set your password.</Text>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing="6">
                {registerError && (
                  <Alert status="error">
                    <AlertIcon />
                    {registerErrorText}
                  </Alert>
                )}
                <FormControl
                  isRequired
                  isInvalid={
                    !!formik.errors.password && formik.touched.password
                  }
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    {...formik.getFieldProps("password")}
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={
                    !!formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                  }
                >
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  <FormErrorMessage>
                    {formik.errors.confirmPassword}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isRegistering}
                  loadingText="Setting password"
                >
                  Continue
                </Button>
              </Stack>
            </form>
          </Stack>
        </Container>
      </SlideFade>
    </>
  );
};

export default SetPassword;
