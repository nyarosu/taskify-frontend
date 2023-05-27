import {
  Box,
  useDisclosure,
  Tab,
  TabList,
  Tabs,
  Flex,
  Skeleton,
  TabPanels,
  TabPanel,
  SlideFade,
} from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement } from "react";
import { OrganizationPageHeader } from "@/components/OrganizationPageHeader";
import OrganizationUsersTable from "@/components/OrganizationUsersTable";
import NoUsersInOrganizationMessage from "@/components/NoUsersInOrganizationMessage";
import InviteUserModal from "@/components/InviteUserModal";
import { useQuery } from "@tanstack/react-query";
import { getUsersForOrganization } from "@/utils/queries";
import LoggedInLayout from "@/components/LoggedInLayout";
import PendingUsersList from "@/components/PendingUsersList";

const Organization = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isLoading,
    isError,
    data: users,
  } = useQuery({ queryKey: ["users"], queryFn: getUsersForOrganization });

  const hasUsers = !isLoading && !isError && users.active.length > 0;
  const pendingCount = !isLoading && !isError && users.pending.length;

  return (
    <>
      <Head>
        <title>Taskify | Organization</title>
      </Head>
      <InviteUserModal isOpen={isOpen} onClose={onClose} />
      <SlideFade in={true}>
        <OrganizationPageHeader hasUsers openModal={onOpen} />
        <Flex direction="column" align="center">
          <Tabs
            top="2rem"
            left="1.8rem"
            marginBottom="2rem"
            position="relative"
            alignSelf="flex-start"
            size={"lg"}
            variant="with-line"
            width="100%"
          >
            <TabList>
              <Tab>Active</Tab>
              <Tab isDisabled={pendingCount === 0 || isLoading || isError}>
                Pending ({!isLoading && !isError ? pendingCount : 0})
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Skeleton isLoaded={!isLoading && !isError}>
                  {hasUsers ? (
                    <OrganizationUsersTable users={users ? users.active : []} />
                  ) : (
                    <NoUsersInOrganizationMessage openModal={onOpen} />
                  )}
                </Skeleton>
              </TabPanel>
              <TabPanel>
                <PendingUsersList users={users ? users.pending : []} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </SlideFade>
    </>
  );
};

Organization.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout>{page}</LoggedInLayout>;
};

export default Organization;
