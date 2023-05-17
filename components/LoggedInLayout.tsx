import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Box, Container, SlideFade } from "@chakra-ui/react";
import { useAppSelector } from "@/utils/redux_hooks";
import { useRouter } from "next/router";
import { checkAuthStatusOrRedirect } from "@/utils/queries";
import { API_URL } from "@/pages/_app";

interface LoggedInLayoutProps {
  children: ReactNode;
}

export default function LoggedInLayout({ children }: LoggedInLayoutProps) {
  // Logged in pages need to have a check to make sure user is authenticated
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    checkAuthStatusOrRedirect(router);
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
