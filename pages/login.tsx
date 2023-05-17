import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  SlideFade,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Logo } from "../components/Logo";
import IndexPageNavbar from "@/components/IndexPageNavbar";
import { useFormik } from "formik";
import { API_URL } from "./_app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { login } from "@/utils/store";
import { useAppDispatch } from "@/utils/redux_hooks";

const Login = () => {
  const dispatcher = useAppDispatch();
  const router = useRouter();
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginFormHandler = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (form) => {
      console.log(form);
    },
  });

  // Check if cookie is already set (user already logged in)
  useEffect(() => {
    checkAlreadyLoggedIn();
  }, []);

  async function submitLoginHandler() {
    setLoginLoading(true);
    setLoginError(false);
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: loginFormHandler.values.email,
        password: loginFormHandler.values.password,
      }),
    });

    if (response.ok) {
      setLoginLoading(false);
      const json = await response.json();
      dispatcher(
        login({
          first_name: json.first_name,
          last_name: json.last_name,
          email: json.email,
          company: json.company,
          picture: /* TODO */ "",
        })
      );
      router.push("/dashboard", undefined, { shallow: true });
    } else {
      setLoginLoading(false);
      setLoginError(true);
    }
  }

  async function checkAlreadyLoggedIn() {
    const response = await fetch(`${API_URL}/me`, { credentials: "include" });
    if (response.ok) {
      const json = await response.json();
      dispatcher(
        login({
          first_name: json.first_name,
          last_name: json.last_name,
          email: json.email,
          company: json.company,
          picture: /* TODO */ "",
        })
      );
      setIsLoggedIn(true);
      router.push("/dashboard", undefined, { shallow: true });
    }
  }

  return (
    !isLoggedIn && (
      <>
        <IndexPageNavbar />
        <SlideFade in={!isLoggedIn}>
          <Container maxW="md" py={{ base: "12", md: "24" }}>
            <Stack spacing="8">
              {loginError && (
                <Alert status="error">
                  <AlertIcon />
                  Invalid email or password
                </Alert>
              )}
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
                    isLoading={loginLoading}
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
        </SlideFade>
      </>
    )
  );
};

export default Login;
