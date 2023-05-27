import {
  Avatar,
  Box,
  Checkbox,
  Fade,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

const PendingUsersList: React.FC<{ users: OrganizationUser[] }> = (props) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("gray.800", "gray.200");
  const hoverColor = useColorModeValue("gray.100", "gray.800");

  return (
    <Table
      variant="unstyled"
      colorScheme="blue"
      {...props}
      backgroundColor="white"
    >
      <Thead bgColor={bgColor} color={color}>
        <Tr>
          <Td fontWeight="bold">Name</Td>
          <Td fontWeight="bold">Role</Td>
          <Td fontWeight="bold">Email</Td>
          <Td fontWeight="bold">Status</Td>
        </Tr>
      </Thead>
      <Tbody>
        {props.users.map((user) => (
          <Tr key={user.email} _hover={{ backgroundColor: hoverColor }}>
            <Td>
              <HStack spacing="3">
                <Avatar
                  name={user.first_name + " " + user.last_name}
                  src={user.picture ? user.picture : ""}
                  boxSize="10"
                />
                <Box>
                  <Text fontWeight="medium">
                    {user.first_name + " " + user.last_name}
                  </Text>
                </Box>
              </HStack>
            </Td>
            <Td>
              <Text>{user.role}</Text>
            </Td>
            <Td>
              <Text>{user.email}</Text>
            </Td>
            <Td>
              <Text color="gray.500">Pending Invitation</Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default PendingUsersList;
