import { Flex, Heading, Text } from '@chakra-ui/react'
import './App.css'
import SearchBox from './components/SearchBox'
import { ViewIcon } from '@chakra-ui/icons'

function App() {

  return (
    <Flex justifyContent="center" height="100vh" alignItems="center" flexDirection="column" minWidth="400px" px={8} maxWidth="40%" marginX="auto">
      <ViewIcon boxSize={'16'}/>  
      <Heading as="h1" mb={10} fontSize="5xl"> Perspective </Heading> 
      <SearchBox /> 

      <Text mt={1} alignSelf="flex-end" opacity="50%"> Powered by Rest Countries API</Text>
    </Flex>
  )
}

export default App
