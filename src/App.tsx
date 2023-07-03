import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import './App.css'
import SearchBox from './components/SearchBox'
import { ViewIcon } from '@chakra-ui/icons'
import CountryCard from './components/CountryCard'

function App() {

  return (
    <Flex justifyContent="center" minHeight="100vh" alignItems="center" flexDirection="column" minWidth="400px" px={8} maxWidth="60%" marginX="auto">
      <ViewIcon boxSize={'16'}/>  
      <Heading as="h1" mb={10} fontSize="5xl"> Perspective </Heading> 
      <Flex flexDirection="column" minWidth="60%"  px={10}>
        <SearchBox /> 
      <Text mt={1} alignSelf="flex-end" opacity="50%"> Powered by Rest Countries API</Text>
      </Flex>

       <SimpleGrid columns={3} minChildWidth="200px" gap={3} width="100%" mt={10}>
        <CountryCard/>
        <CountryCard/>
        <CountryCard/>
      </SimpleGrid>
   </Flex>
  )
}

export default App
