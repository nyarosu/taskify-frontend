import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Image,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Grid,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

const CreateProjectModal: React.FC<{ isOpen: boolean; onClose: () => void }> = (
  props
) => {
  const [projectCoverImage, setProjectCoverImage] = useState('');

  const handleSubmit = (values: any) => {

    console.log('Form Values:', values);

    props.onClose();
  };

  const handleImageChange = (imageUrl: string) => {
    setProjectCoverImage(imageUrl);
  };

  const coverImages = [
    'https://www.iconpacks.net/icons/2/free-rocket-icon-3428-thumb.png',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',

  ];


  const projectLeadSuggestions = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
  ];
  
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
        <Formik
          initialValues={{
            projectName: '',
            projectKey: '',
            projectDescription: '',
            projectLead: '',
            projectCoverImage: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <Box>
                <FormControl mb={4}>
                  <FormLabel>Project Name</FormLabel>
                  <Field
                    as={Input}
                    name="projectName"
                    required
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Project Key</FormLabel>
                  <Field
                    as={Input}
                    name="projectKey"
                    required
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Project Description</FormLabel>
                  <Field
                    as={Textarea}
                    name="projectDescription"
                    required
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Project Lead</FormLabel>
                  <Field
                    as={Input}
                    name="projectLead"
                    required
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Cover Image</FormLabel>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    {coverImages.map((image, index) => (
                      <Box
                        key={index}
                        onClick={() => handleImageChange(image)}
                        cursor="pointer"
                        borderWidth={2}
                        borderColor={projectCoverImage === image ? 'blue.500' : 'gray.300'}
                        borderRadius="md"
                        p={2}
                      >
                        <Image
                          src={image}
                          alt={`Image ${index + 1}`}
                          boxSize="100%"
                          objectFit="cover"
                        />
                      </Box>
                    ))}
                  </Grid>
                </FormControl>
              </Box>

            </Form>
          )}
        </Formik>
      </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button colorScheme="blue">Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProjectModal;
