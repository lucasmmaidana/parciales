import { useForm } from "react-hook-form"
import { mutate } from "swr"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  useDisclosure,
} from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { PlusIcon } from "@heroicons/react/outline"
import { useAuth } from "@/lib/auth"

import { createComision } from "@/lib/db"

const AddComisionModal = ({ children }) => {
  const toast = useToast()
  const auth = useAuth()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register } = useForm()

  const onCreateComision = ({ nombre, materia, carrera, universidad }) => {
    // Create the new object to save in Firestore
    const newComision = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      nombre,
      materia,
      carrera,
      universidad,
    }
    // Retrieve the document ID for Firestore
    const { id } = createComision(newComision)
    // Show a toast message
    toast({
      title: "Success!",
      description: "We've added your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    // Update the SWR cache to add the new site
    mutate(
      ["/api/comisiones", auth.user.token],
      async (data) => ({
        comisiones: [{ id, ...newComision }, ...data.comisiones],
      }),
      false
    )
    onClose()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
        leftIcon={<Icon as={PlusIcon} />}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateComision)}>
          <ModalHeader fontWeight="bold">Nueva comisión</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                placeholder="Turno mañana"
                name="nombre"
                {...register("nombre", {
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Materia</FormLabel>
              <Input
                placeholder="Anatomía I"
                name="materia"
                {...register("materia", {
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Carrera</FormLabel>
              <Input
                placeholder="Medicina"
                name="carrera"
                {...register("carrera", {
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Universidad</FormLabel>
              <Input
                placeholder="UTN"
                name="universidad"
                {...register("universidad", {
                  required: "Required",
                })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancelar
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Crear comisión
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AddComisionModal
