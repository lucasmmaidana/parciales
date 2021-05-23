import React from "react"
import NextLink from "next/link"
import { Box, Link } from "@chakra-ui/react"
import { Table, Tr, Th, Td } from "./Table"

const ComisionTable = ({ comisiones }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Materia</Th>
            <Th>Carrera</Th>
            <Th>Universidad</Th>
            <Th width="50px">{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {comisiones.map((comision) => (
            <Box as="tr" key={comision.id}>
              <Td fontWeight="medium">{comision.nombre}</Td>
              <Td>{comision.materia}</Td>
              <Td>{comision.carrera}</Td>
              <Td>{comision.universidad}</Td>
              <Td>
                <NextLink
                  href="/p/[comisionId]"
                  as={`/p/${comision.id}`}
                  passHref
                >
                  <Link color="blue.500" fontWeight="medium">
                    Ver parciales
                  </Link>
                </NextLink>
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}
export default ComisionTable
