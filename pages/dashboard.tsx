import { Box, Container, SlideFade } from "@chakra-ui/react";
import { DashboardContent } from "../components/DashboardContent";
import { useAppSelector, useAppDispatch } from "@/utils/redux_hooks";
import { Navbar } from "../components/Navbar";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  console.log("In dashboard, user is", user);
  return (
    <SlideFade in={true}>
      <Box as="section" height="100vh" overflowY="auto">
        <Navbar />
        <Container pt={{ base: "8", lg: "12" }} pb={{ base: "12", lg: "24" }}>
          <DashboardContent />
        </Container>
      </Box>
    </SlideFade>
  );
};

export default Dashboard;
