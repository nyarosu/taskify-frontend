import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Logo } from "../components/Logo";
import IndexPageNavbar from "@/components/IndexPageNavbar";
import { useFormik } from "formik";
import { API_URL } from "./_app";

const Login = () => {
  const loginFormHandler = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (form) => {
      console.log(form);
    },
  });

  async function submitLoginHandler() {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginFormHandler.values.email,
        password: loginFormHandler.values.password,
      }),
    });

    if (response.ok) {
      console.log("Authenticated!");
      const response2 = await fetch(`${API_URL}/tasks`);
      console.log(response2.ok);
    } else {
      console.log("AUth failed!");
    }
  }
  return (
    <>
      <IndexPageNavbar />
      <Container maxW="md" py={{ base: "12", md: "24" }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "sm" }}>
                Log in to your account
              </Heading>
              <Text color="muted">Start making your dreams come true</Text>
            </Stack>
          </Stack>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  onChange={loginFormHandler.handleChange}
                  value={loginFormHandler.values.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  placeholder="********"
                  type="password"
                  onChange={loginFormHandler.handleChange}
                  value={loginFormHandler.values.password}
                />
              </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password
              </Button>
            </HStack>
            <Stack spacing="4">
              <Button
                variant="solid"
                colorScheme="green"
                onClick={submitLoginHandler}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
          <HStack spacing="1" justify="center">
            <Text fontSize="sm" color="muted">
              Don&apos;t have an account?
            </Text>
            <Button variant="link" colorScheme="blue" size="sm">
              Sign up
            </Button>
          </HStack>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
