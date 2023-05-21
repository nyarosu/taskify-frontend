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
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { MdPerson } from "react-icons/md";
import { BsFillPersonPlusFill } from "react-icons/bs";

const InviteUserModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const inviteUserSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
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
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched }) => (
              <Form>
                <VStack spacing={4} align="stretch">
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <FormControl
                      isInvalid={!!errors.firstName && touched.firstName}
                    >
                      <FormLabel>First Name</FormLabel>
                      <Field as={Input} name="firstName" />
                      {errors.firstName && touched.firstName && (
                        <Text color="red.500" fontSize="sm">
                          {errors.firstName}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl
                      isInvalid={!!errors.lastName && touched.lastName}
                    >
                      <FormLabel>Last Name</FormLabel>
                      <Field as={Input} name="lastName" />
                      {errors.lastName && touched.lastName && (
                        <Text color="red.500" fontSize="sm">
                          {errors.lastName}
                        </Text>
                      )}
                    </FormControl>
                  </Grid>

                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Field as={Input} name="email" />
                    {errors.email && touched.email && (
                      <Text color="red.500" fontSize="sm">
                        {errors.email}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl isInvalid={!!errors.role && touched.role}>
                    <FormLabel>Role</FormLabel>
                    <Field as={Input} name="role" />
                    {errors.role && touched.role && (
                      <Text color="red.500" fontSize="sm">
                        {errors.role}
                      </Text>
                    )}
                  </FormControl>
                </VStack>
              </Form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" type="submit" form="invite-user-form">
            Invite User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InviteUserModal;
