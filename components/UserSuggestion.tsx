import { Box, HStack, Text, Image, Avatar } from "@chakra-ui/react";

export interface UserItemProps {
  user: {
    full_name: string;
    email: string;
    role: string;
  };
}

export const UserSuggestion: React.FC<UserItemProps> = ({ user }) => {
  return (
    <HStack>
      <Avatar
        borderRadius="full"
        boxSize="40px"
        src={""}
        name={user.full_name}
      />
      <Box>
        <Text fontWeight="bold">{user.full_name}</Text>
        <Text fontSize="sm" color="gray.500">
          {user.role}
        </Text>
      </Box>
    </HStack>
  );
};
