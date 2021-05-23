import React from "react"
import { Box, Heading, Text, Divider } from "@chakra-ui/react"

const Parcial = ({ nombre, descripcion }) => (
  <Box borderRadius={4} maxWidth="700px" w="full">
    <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
      {nombre}
    </Heading>
    <Text color="gray.800">{descripcion}</Text>
    <Divider borderColor="gray.200" backgroundColor="gray.200" mt={8} mb={8} />
  </Box>
)
export default Parcial
