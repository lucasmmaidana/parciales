import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Box,
} from "@chakra-ui/react"
import AddComisionModal from "./AddComisionModal"

const SiteTableHeader = (props) => (
  <Box mx={4}>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Comisiones</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>Mis comisiones</Heading>
      <AddComisionModal>Nueva comisión</AddComisionModal>
    </Flex>
  </Box>
)
export default SiteTableHeader
