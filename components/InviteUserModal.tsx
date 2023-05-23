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

const InviteUserModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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
    setLoading(true);

    const response = await fetch(`${API_URL}/company/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        role: values.role,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      if (response.status === 409) {
        toast({
          title: "An error occurred.",
          position: "top",
          description:
            "The user you're trying to invite already has an account with this email.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "An error occurred.",
          position: "top",
          description: "An unknown error occurred. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Invite sent!",
        position: "top",
        description:
          "An invite has been sent to the email address you specified.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    onClose();
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
                  <Button colorScheme="blue" type="submit" isLoading={loading}>
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
