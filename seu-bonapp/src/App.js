import Router from "./routes/Router";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"

const App = () => {

  const theme = extendTheme({
    colors: {
      brand: {
        blue: "#088dae",
        // ...
        yellow: "#fcbb19",
      },
    },
  })
  

  return (
    <ChakraProvider theme={theme}> 
      <Router/>
    </ChakraProvider>   
  );
}

export default App;
