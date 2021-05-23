import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { getAllComisiones, getAllParciales } from "../../lib/db-admin"

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
  const router = useRouter()
  return <Box>Site ID: ${router.query.comisionId}</Box>
}
export default ComisionPage
