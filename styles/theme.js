import { extendTheme } from "@chakra-ui/react"

// Modo oscuro
const config = {
  initialColorMode: "light",
}

const fonts = {
  body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
}
const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 800,
}

const theme = extendTheme({ config, fonts, fontWeights })

export default theme
