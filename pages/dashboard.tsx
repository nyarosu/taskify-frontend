import { Box, Container, SlideFade } from "@chakra-ui/react";
import { DashboardContent } from "../components/DashboardContent";
import { useAppSelector, useAppDispatch } from "@/utils/redux_hooks";
import { Navbar } from "../components/Navbar";
import LoggedInLayout from "@/components/LoggedInLayout";
import { ReactElement, ReactNode } from "react";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <SlideFade in={true}>
      <Box as="section" height="100vh" overflowY="auto">
        <Container pt={{ base: "8", lg: "12" }} pb={{ base: "12", lg: "24" }}>
          <DashboardContent />
        </Container>
      </Box>
    </SlideFade>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout>{page}</LoggedInLayout>;
};

export default Dashboard;
