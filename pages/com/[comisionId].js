import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"
import { getAllComisiones, getAllParciales } from "@/lib/db-admin"
import { createParcial } from "@/lib/db"
import { useAuth } from "@/lib/auth"
import Parcial from "@/components/Parcial"

export async function getStaticProps(context) {
  const comisionId = context.params.comisionId
  const { parciales } = await getAllParciales(comisionId)
  return {
    props: {
      initialParciales: parciales,
    },
    revalidate: 1,
  }
}
export async function getStaticPaths() {
  const { comisiones } = await getAllComisiones()
  const paths = comisiones.map((comision) => ({
    params: {
      comisionId: comision.id.toString(),
    },
  }))
  return {
    paths,
    fallback: true,
  }
}
const ComisionPage = ({ initialParciales }) => {
  const auth = useAuth()
  const router = useRouter()
  const inputNombre = useRef(null)
  const inputDescripcion = useRef(null)
  const [allParciales, setAllParciales] = useState([])

  useEffect(() => {
    setAllParciales(initialParciales)
  }, [initialParciales])

  const onSubmit = (e) => {
    e.preventDefault()
    const newParcial = {
      author: auth.user.name,
      authorId: auth.user.uid,
      comisionId: router.query.comisionId,
      nombre: inputNombre.current.value,
      descripcion: inputDescripcion.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: "publicado",
    }
    inputNombre.current.value = ""
    inputDescripcion.current.value = ""
    setAllParciales((currentParciales) => [newParcial, ...currentParciales])
    createParcial(newParcial)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      {auth.user && (
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor="nombre">Nombre</FormLabel>
            <Input
              ref={inputNombre}
              id="nombre"
              placeholder="Primer parcial"
              required
            />
            <FormLabel mt={4} htmlFor="descripcion">
              Descripción
            </FormLabel>
            <Input
              ref={inputDescripcion}
              id="descripcion"
              placeholder="Unidad 1, Unidad 2..."
              required
            />
            <Button mt={4} type="submit" fontWeight="medium">
              Añadir parcial
            </Button>
          </FormControl>
        </Box>
      )}
      {allParciales &&
        allParciales.map((parcial) => (
          <Parcial
            key={parcial.id || new Date().getTime().toString()}
            {...parcial}
          />
        ))}
    </Box>
  )
}
export default ComisionPage
