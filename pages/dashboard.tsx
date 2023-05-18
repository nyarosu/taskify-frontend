import { Box, Container, SlideFade } from "@chakra-ui/react";
import { DashboardContent } from "../components/DashboardContent";
import { useAppSelector, useAppDispatch } from "@/utils/redux_hooks";
import { Navbar } from "../components/Navbar";
import LoggedInLayout from "@/components/LoggedInLayout";
import { ReactElement, ReactNode } from "react";
import Head from "next/head";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <Head>
        <title>Taskify | Dashboard</title>
      </Head>
      <SlideFade in={true}>
        <DashboardContent />
      </SlideFade>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout>{page}</LoggedInLayout>;
};

export default Dashboard;
