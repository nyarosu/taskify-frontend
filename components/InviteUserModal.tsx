import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Grid,
  VStack,
  Text,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdPerson } from "react-icons/md";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { API_URL } from "@/pages/_app";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteUserToOrganization } from "@/utils/queries";

const InviteUserModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedRole, setSelectedRole] = useState("");
  const toast = useToast();
  const queryClient = useQueryClient();
  const inviteUserMutation = useMutation({
    mutationFn: inviteUserToOrganization,
    onSuccess: (data, variables) => {
      // Update cache with newly invited user
      const currentUsers = queryClient.getQueryData<OrganizationUserData>([
        "users",
      ]);
      if (currentUsers) {
        queryClient.setQueryData(["users"], {
          active: currentUsers.active,
          pending: [...currentUsers.pending, data],
        });
      }
    },
  });

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const inviteUserSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }) => {
    try {
      await inviteUserMutation.mutateAsync(values);

      toast({
        title: "Invite sent!",
        position: "top",
        description:
          "An invite has been sent to the email address you specified.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "An error occured.",
          position: "top",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
      return;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <BsFillPersonPlusFill />
            <Text>Invite a user</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              role: "",
            }}
            validationSchema={inviteUserSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm();
            }}
          >
            {({ values, errors, touched, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <FormControl
                      isInvalid={!!errors.firstName && touched.firstName}
                    >
                      <FormLabel>First Name</FormLabel>
                      <Field as={Input} name="firstName" />
                      <ErrorMessage
                        name="firstName"
                        render={(msg) => (
                          <Text color="red.500" fontSize="sm">
                            {msg}
                          </Text>
                        )}
                      />
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors.lastName && touched.lastName}
                    >
                      <FormLabel>Last Name</FormLabel>
                      <Field as={Input} name="lastName" />
                      <ErrorMessage
                        name="lastName"
                        render={(msg) => (
                          <Text color="red.500" fontSize="sm">
                            {msg}
                          </Text>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Field as={Input} name="email" />
                    <ErrorMessage
                      name="email"
                      render={(msg) => (
                        <Text color="red.500" fontSize="sm">
                          {msg}
                        </Text>
                      )}
                    />
                  </FormControl>

                  <FormControl isInvalid={!!errors.role && touched.role}>
                    <FormLabel>Role</FormLabel>
                    <Field as={Input} name="role" />
                    <ErrorMessage
                      name="role"
                      render={(msg) => (
                        <Text color="red.500" fontSize="sm">
                          {msg}
                        </Text>
                      )}
                    />
                  </FormControl>
                </VStack>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    colorScheme="blue"
                    type="submit"
                    isLoading={inviteUserMutation.isLoading}
                  >
                    Invite User
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InviteUserModal;
