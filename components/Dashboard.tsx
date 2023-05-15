import { Box, Container } from "@chakra-ui/react";
import { DashboardContent } from "./DashboardContent";
import { Navbar } from "./Navbar";

export const App = () => (
  <Box as="section" height="100vh" overflowY="auto">
    <Navbar />
    <Container pt={{ base: "8", lg: "12" }} pb={{ base: "12", lg: "24" }}>
      <DashboardContent />
    </Container>
  </Box>
);
