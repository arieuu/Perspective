import { Alert, Box, Flex, Heading, SimpleGrid, Text, background, color, useColorMode, useToast } from '@chakra-ui/react'
import './App.css'
import SearchBox from './components/SearchBox'
import { CopyIcon, ViewIcon } from '@chakra-ui/icons'
import CountryCard from './components/CountryCard'
import { useState } from 'react'
import ComparisonButtons from './components/ComparisonButtons'
import Country from './model/Country'


function App() {
  const [focus, setFocus] = useState<boolean>(false);
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [comparisonTitle, setComparisonTitle] = useState("Default");

  
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

      setCountryList([...countryList, new Country(name)])

    } else if(name.length < 1) {
      toast({
        title: "Type something first",
        status: "warning",
        duration: 800,
      });
    }
  }

  /*
     When the user clicks delete card this function will update the array of available countries to
     remove the specific country. Then we update state to save the now changed array of countries.
     After that's done we get the focus back to the main input and show a success message.
  */

  const onDelete = (cardId: string, name: string) => {

    setCountryList([...countryList].filter((country, index) => {
      return index.toString() != cardId;
    }));

    setFocus(true);
  
    if(countryList.length < 3) setComparisonTitle("Default")

    toast({
      title: name + " successfully deleted",
      status: "success",
      duration: 1000,

    });
  }

  const onEdit = (cardIndex: string, newName: string) => {

    // Make sure the user types something before editing

    if(newName.length < 2) {
      toast({
      title: "Type something first!",
      status: "warning",
      duration: 1000,
      });

      return
    }
    const editedCountryList = countryList.map((country, index) => {

      if(index.toString() == cardIndex) {

        // We change the input name and rendered atribute to false so a new request is made and the info is updated
        country.setInputName(newName);
        country.setWasRendered(false);
        return country

      } else {
        return country
      }

    });

    setCountryList(editedCountryList);

    toast({
      title: "Edited successfully",
      status: "success",
      duration: 1000
    })
  }

  return (
    
    <Flex justifyContent="center"  minHeight="100vh" alignItems="center" flexDirection="column" minWidth="400px" px={8} maxWidth="60%" marginX="auto">

      <ViewIcon boxSize={'16'} />  
      <Heading as="h1" mb={10} fontSize="5xl">  Perspective </Heading> 

      <Flex flexDirection="column" minWidth="60%"  px={10}>

        <SearchBox onSubmit={onSubmit} focus={focus}/> 
        <Text mt={1} alignSelf="flex-end" opacity="50%"> Powered by Rest Countries API</Text>

      </Flex>

      { countryList.length > 1 &&
        <Flex flexDirection="row" width="100%" justifyContent="space-between"  marginTop={{base: "10", xl: "0"}}>

          <Box marginY="auto">
            <Heading mt={5}> {comparisonTitle} </Heading>
          </Box>

          <Box marginY="auto">
            <ComparisonButtons setCountryList={setCountryList} countryList={countryList} setComparisonTitle={setComparisonTitle}/>
          </Box>

        </Flex>
      }

      {/* countryNames.length == 0 && <Text marginTop={32} opacity="50%"> No cards yet <CopyIcon /> </Text> */}

      <SimpleGrid columns={3} minChildWidth="220px" gap={3} width="100%" mt={8}>

        {countryList.map((country, index) => 

          <CountryCard countryEntity={country} onDelete={onDelete} onEdit={onEdit} setFocus={setFocus} key={index} index={index} countryList={countryList}/>
        )} 

      </SimpleGrid>
   </Flex>
  )
}

export default App
