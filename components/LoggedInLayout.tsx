import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Box, Container, SlideFade } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/utils/redux_hooks";
import { useRouter } from "next/router";
import { API_URL } from "@/pages/_app";
import { createLoginAction, login } from "@/utils/store";

interface LoggedInLayoutProps {
  children: ReactNode;
}

export default function LoggedInLayout({ children }: LoggedInLayoutProps) {
  const user = useAppSelector((state) => state.user);
  const dispatcher = useAppDispatch();
  const router = useRouter();

  async function checkAuth(): Promise<any> {
    const response = await fetch(`${API_URL}/me`, { credentials: "include" });
    if (!response.ok) {
      router.push("/login", undefined, { shallow: true });
      return;
    }
    const data = await response.json();
    dispatcher(createLoginAction(data));
  }

  // Logged in pages need to have a check to make sure user is authenticated
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Navbar />
      <SlideFade in={true}>
        <Box as="section" height="100vh" overflowY="auto">
          <Container pt={{ base: "8", lg: "12" }} pb={{ base: "12", lg: "24" }}>
            {children}
          </Container>
        </Box>
      </SlideFade>
    </>
  );
}
