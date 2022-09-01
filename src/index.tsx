import ReactDOM from "react-dom"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { App } from "./components/App/App"

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById("root"),
)