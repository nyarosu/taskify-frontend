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
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Logo } from "@/components/Logo";
import IndexPageNavbar from "@/components/IndexPageNavbar";
import { useRouter } from "next/router";
import { SignupModes } from "@/utils/SignupModes";
import { API_URL } from "../_app";
import { createLoginAction, login } from "@/utils/store";
import { useAppDispatch } from "@/utils/redux_hooks";

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
  companyName: Yup.string().required("Company name is required"),
});

const SignupAsOrganization = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const [registerError, setRegisterError] = useState(false);
  const [registerErrorText, setRegisterErrorText] = useState("");

  const dispatcher = useAppDispatch();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      companyName: "",
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
        mode: SignupModes.Organization,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        company_name: values.companyName,
      }),
    });

    if (response.ok) {
      const json = await response.json();
      dispatcher(createLoginAction(json));
      router.push("/dashboard", undefined, { shallow: true });
    } else if (response.status === 409) {
      setIsRegistering(false);
      setRegisterErrorText("A user with this email already exists.");
      setRegisterError(true);
    } else {
      setIsRegistering(false);
      setRegisterErrorText("Invalid details");
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
                {registerErrorText}
              </Alert>
            )}
            <Logo boxSize="4rem" />
            <Heading size={{ base: "xs", md: "sm" }}>Create an account</Heading>
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing="6">
              <Stack spacing="5">
                <Stack spacing="3" direction={{ base: "column", md: "row" }}>
                  <FormControl
                    isRequired
                    isInvalid={
                      !!formik.errors.firstName && formik.touched.firstName
                    }
                  >
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      id="firstName"
                      type="text"
                      {...formik.getFieldProps("firstName")}
                    />
                    <FormErrorMessage>
                      {formik.errors.firstName}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={
                      !!formik.errors.lastName && formik.touched.lastName
                    }
                  >
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      id="lastName"
                      type="text"
                      {...formik.getFieldProps("lastName")}
                    />
                    <FormErrorMessage>
                      {formik.errors.lastName}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <FormControl
                  isRequired
                  isInvalid={
                    !!formik.errors.companyName && formik.touched.companyName
                  }
                >
                  <FormLabel htmlFor="companyName">Company Name</FormLabel>
                  <Input
                    id="companyName"
                    type="text"
                    {...formik.getFieldProps("companyName")}
                  />
                  <FormErrorMessage>
                    {formik.errors.companyName}
                  </FormErrorMessage>
                </FormControl>
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
              </Stack>
              <Stack spacing="4">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isRegistering}
                  loadingText="Creating account"
                >
                  Create account
                </Button>
              </Stack>
            </Stack>
          </form>
          <Stack justify="center" spacing="1" align="center">
            <Text fontSize="sm" color="muted">
              Already have an account?
            </Text>
            <Button
              variant="link"
              colorScheme="blue"
              size="sm"
              onClick={() => {
                router.push("/login", undefined, { shallow: true });
              }}
            >
              Log in
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default SignupAsOrganization;
