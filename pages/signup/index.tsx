import {
  Button,
  Container,
  Divider,
  Heading,
  Input,
  SlideFade,
  Stack,
} from "@chakra-ui/react";
import { Logo } from "@/components/Logo";
import IndexPageNavbar from "@/components/IndexPageNavbar";
import { CgOrganisation } from "react-icons/cg";
import { BsFillPersonFill } from "react-icons/bs";
import Head from "next/head";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Taskify | Sign up</title>
      </Head>
      <IndexPageNavbar />
      <SlideFade in={true}>
        <Container maxW="md" py={{ base: "12", md: "24" }}>
          <Stack spacing="8">
            <Stack spacing="6" align="center">
              <Logo boxSize="4rem" />
              <Heading size={{ base: "xs", md: "sm" }}>
                Create an account
              </Heading>
            </Stack>
            <Stack spacing="4">
              <Button
                variant="primary"
                iconSpacing="3"
                leftIcon={<CgOrganisation />}
                onClick={() => {
                  router.push("/signup/organization", undefined, {
                    shallow: true,
                  });
                }}
              >
                Sign up as an organization
              </Button>
              <Button
                variant="secondary"
                leftIcon={<BsFillPersonFill />}
                onClick={() => {
                  router.push("/signup/individual", undefined, {
                    shallow: true,
                  });
                }}
              >
                Sign up as an individual user
              </Button>
            </Stack>
          </Stack>
        </Container>
      </SlideFade>
    </>
  );
};

export default Signup;
