import LoggedInLayout from "@/components/LoggedInLayout";
import {
  Box,
  Button,
  Heading,
  SlideFade,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement } from "react";
import { OrganizationPageHeader } from "@/components/OrganizationPageHeader";
import { AiOutlinePlus } from "react-icons/ai";
import CompanyUsersTable from "@/components/OrganizationUsersTable";
import NoUsersInCompanyMessage from "@/components/NoUsersInOrganizationMessage";
import OrganizationUsersTable from "@/components/OrganizationUsersTable";
import NoUsersInOrganizationMessage from "@/components/NoUsersInOrganizationMessage";
import InviteUserModal from "@/components/InviteUserModal";

const Organization = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hasUsers = false;
  return (
    <>
      <Head>
        <title>Taskify | Organization</title>
      </Head>
      <InviteUserModal isOpen={isOpen} onClose={onClose} />
      <SlideFade in={true}>
        <OrganizationPageHeader hasUsers={false} />
        <Box overflowX="auto" marginTop={"2rem"} position="relative" zIndex={1}>
          {hasUsers ? (
            <OrganizationUsersTable />
          ) : (
            <NoUsersInOrganizationMessage openModal={onOpen} />
          )}
        </Box>
      </SlideFade>
    </>
  );
};

Organization.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout>{page}</LoggedInLayout>;
};

export default Organization;
