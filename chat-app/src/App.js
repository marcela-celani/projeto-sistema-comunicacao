import Router from "./routes/Router";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"

const App = () => {

  const theme = extendTheme({
    colors: {
      brand: {
        blue: "#00e4e3",
        // ...
        purple: "#a060ff",
        lightblue: "#b7e4e3",
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
