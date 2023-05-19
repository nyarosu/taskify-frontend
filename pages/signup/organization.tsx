import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
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

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]*$/, "Name must not contain numbers"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  companyName: Yup.string().required("Company name is required"),
});

const SignupAsOrganization = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      companyName: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values: any) {
    console.log(values);
  }

  return (
    <>
      <IndexPageNavbar />

      <Container maxW="md" py={{ base: "12", md: "24" }}>
        <Stack spacing="8">
          <Stack spacing="6" align="center">
            <Logo boxSize="4rem" />
            <Heading size={{ base: "xs", md: "sm" }}>Create an account</Heading>
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl
                  isRequired
                  isInvalid={!!formik.errors.name && formik.touched.name}
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    {...formik.getFieldProps("name")}
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>
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
                  isLoading={isSubmitting}
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
            <Button variant="link" colorScheme="blue" size="sm">
              Log in
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default SignupAsOrganization;
