import {
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Input,
  Text,
  SlideFade,
  Stack,
} from "@chakra-ui/react";
import { Logo } from "@/components/Logo";
import IndexPageNavbar from "@/components/IndexPageNavbar";
import { CgOrganisation } from "react-icons/cg";
import {
  BsFillPersonFill,
  BsBuildingAdd,
  BsFillBuildingFill,
  BsBuildingFillAdd,
} from "react-icons/bs";
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
                leftIcon={<BsFillBuildingFill />}
                onClick={() => {
                  router.push("/signup/organization", undefined, {
                    shallow: true,
                  });
                }}
              >
                Sign up as an organization
              </Button>
              <Divider />
              <Button
                variant="primary"
                iconSpacing="3"
                leftIcon={<BsBuildingFillAdd />}
                onClick={() => {
                  router.push("/verify", undefined, { shallow: true });
                }}
              >
                Join an existing organization
              </Button>
            </Stack>
            <HStack alignSelf="center">
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
            </HStack>
          </Stack>
        </Container>
      </SlideFade>
    </>
  );
};

export default Signup;
