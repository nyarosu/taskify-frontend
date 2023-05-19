import { useState } from "react";
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
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Logo } from "@/components/Logo";
import { GoogleIcon } from "@/assets/ProviderIcon";
import IndexPageNavbar from "@/components/IndexPageNavbar";
import { useRouter } from "next/router";
import { API_URL } from "../_app";
import { useAppDispatch } from "@/utils/redux_hooks";
import { login } from "@/utils/store";
import { SignupModes } from "@/utils/SignupModes";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z\s]*$/, "First name must not contain numbers"),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z\s]*$/, "Last name must not contain numbers"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const IndividualSignup = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const dispatcher = useAppDispatch();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: any) {
    setIsRegistering(true);
    setRegisterError(false);
    const response = await fetch(`${API_URL}/auth/signup`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        mode: SignupModes.Individual,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
      }),
    });
    console.log(response);

    if (response.ok) {
      const json = await response.json();
      dispatcher(
        login({
          first_name: json.first_name,
          last_name: json.last_name,
          email: json.email,
          company: json.company_name,
          picture: "" /* TODO */,
        })
      );
      router.push("/dashboard", undefined, { shallow: true });
    } else {
      setIsRegistering(false);
      setRegisterError(true);
    }
  }

  return (
    <>
      <IndexPageNavbar />

      <Container maxW="md" py={{ base: "12", md: "24" }}>
        <Stack spacing="8">
          <Stack spacing="6" align="center">
            {registerError && (
              <Alert status="error">
                <AlertIcon />
                User already exists.
              </Alert>
            )}
            <Logo boxSize="4rem" />
            <Stack spacing="3" textAlign="center">
              <Heading size={{ base: "xs", md: "sm" }}>
                Create an account
              </Heading>
            </Stack>
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing="6">
              <Stack spacing="5" direction={{ base: "column", md: "row" }}>
                <FormControl
                  isRequired
                  isInvalid={
                    !!formik.errors.firstName && formik.touched.firstName
                  }
                >
                  <FormLabel htmlFor="firstName">First name</FormLabel>
                  <Input
                    id="firstName"
                    type="text"
                    {...formik.getFieldProps("firstName")}
                  />
                  <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={
                    !!formik.errors.lastName && formik.touched.lastName
                  }
                >
                  <FormLabel htmlFor="lastName">Last name</FormLabel>
                  <Input
                    id="lastName"
                    type="text"
                    {...formik.getFieldProps("lastName")}
                  />
                  <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                </FormControl>
              </Stack>
              <FormControl
                isRequired
                isInvalid={!!formik.errors.email && formik.touched.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!formik.errors.password && formik.touched.password}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  {...formik.getFieldProps("password")}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing="4">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isRegistering}
                  loadingText="Creating account"
                >
                  Create account
                </Button>
                <Button
                  variant="secondary"
                  leftIcon={<GoogleIcon boxSize="5" />}
                  iconSpacing="3"
                >
                  Sign up with Google
                </Button>
              </Stack>
            </Stack>
          </form>
          <HStack justify="center" spacing="1" mt={4}>
            <Text fontSize="sm" color="muted">
              Already have an account?
            </Text>
            <Button
              onClick={() => {
                router.push("/login", undefined, { shallow: true });
              }}
              variant="link"
              colorScheme="blue"
              size="sm"
            >
              Log in
            </Button>
          </HStack>
        </Stack>
      </Container>
    </>
  );
};

export default IndividualSignup;
