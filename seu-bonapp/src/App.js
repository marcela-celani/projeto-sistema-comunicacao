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
        lightblue: "#98d9ea",
      },
    },
    styles: {
      global: {
        '.custom-scrollbar': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'gray.600 transparent' // Usando a cor gray.400 do Chakra
        },
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '6px'
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: 'gray.600', // Usando a cor gray.400 do Chakra
          borderRadius: '3px'
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          backgroundColor: 'transparent'
        }
      }
    }
  })
  

  return (
    <ChakraProvider theme={theme}> 
      <Router/>
    </ChakraProvider>   
  );
}

export default App;
