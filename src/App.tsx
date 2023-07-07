import { Flex, Heading, SimpleGrid, Text, useColorMode, useToast } from '@chakra-ui/react'
import './App.css'
import SearchBox from './components/SearchBox'
import { CopyIcon, ViewIcon } from '@chakra-ui/icons'
import CountryCard from './components/CountryCard'
import { useState } from 'react'


function App() {
  const [countryNames, setCountryName] = useState<string[]>([]);
  const [focus, setFocus] = useState<boolean>(false);
  const [numberOfCards, setNumberOfCards] = useState(0);
  
  /* Hacking color mode to make it light cause I don't know how else to change it */

  const {colorMode, setColorMode } = useColorMode();
  setColorMode("light")
  
  const toast = useToast();

  // Callback functions to add cards and delete cards respectively. Both will change state

  const onSubmit = (name: string) => {

    // Basic validation. If length is small or non-existent issue a warning

    if(name.length > 1) {
      const num = numberOfCards + 1;
      setNumberOfCards(num);

      setCountryName([...countryNames, name]);

    } else if(name.length < 1) {
      toast({
        title: "Type something first",
        status: "warning",
        duration: 800
      });
    }
  }

  /*
     When the user clicks to delete card this function will update the array of available country names to
     remove the deleted country. That will make the card go away by updating state, then we update state again
     and return focus to input so that the user can go right back to typing.
  */

  const onDelete = (cardId: string, name: string) => {
    setCountryName([...countryNames].filter((value, index) => index.toString() != cardId)); // Filter the selected name out
    setFocus(true);
    // Show a toast success message uppon deletion

    toast({
      title: name + " has been deleted",
      status: "success",
      duration: 1000
    });
  }

  const onEdit = (cardId: string, newName: string) => {
    const newArray = countryNames.map((currentName, index) => {
      if(index.toString() == cardId) {
        return newName

      } else {
        return currentName
      }
    });

    setCountryName(newArray)

    toast({
      title: "Edited successfully",
      status: "success",
      duration: 1000
    })
  }

  return (
    <Flex justifyContent="center" minHeight="100vh" alignItems="center" flexDirection="column" minWidth="400px" px={8} maxWidth="60%" marginX="auto">
      
      <ViewIcon boxSize={'16'} />  
      <Heading as="h1" mb={10} fontSize="5xl"> Perspective </Heading> 

      <Flex flexDirection="column" minWidth="60%"  px={10}>

        <SearchBox onSubmit={onSubmit} focus={focus}/> 
        <Text mt={1} alignSelf="flex-end" opacity="50%"> Powered by Rest Countries API</Text>

      </Flex>

        {/* countryNames.length == 0 && <Text marginTop={32} opacity="50%"> No cards yet <CopyIcon /> </Text> */}

      <SimpleGrid columns={3} minChildWidth="200px" gap={3} width="100%" mt={10}>

        {countryNames.map((name, index) => 
          <CountryCard name={name} onDelete={onDelete} onEdit={onEdit} setFocus={setFocus} key={index} index={index}/>  // Card component, we give it a name and a delete callback
        )} 
      </SimpleGrid>
   </Flex>
  )
}

export default App
