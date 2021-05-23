import React from "react"
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
  Flex,
  Link,
  Avatar,
} from "@chakra-ui/react"
import { useAuth } from "@/lib/auth"

const DashboardShell = ({ children }) => {
  const { user } = useAuth()
  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex backgroundColor="white" mb={16} w="full">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
        >
          <Flex>
            <Link mr={4}>Carreras</Link>
            <Link>Parciales</Link>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Link mr={4}>Mi cuenta</Link>
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Comisiones</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between">
          <Heading mb={8}>Mis comisiones</Heading>
          <Button
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: "gray.700" }}
            _active={{
              bg: "gray.800",
              transform: "scale(0.95)",
            }}
          >
            + Nueva comisión
          </Button>
        </Flex>
        {children}
      </Flex>
    </Box>
  )
}
export default DashboardShell
