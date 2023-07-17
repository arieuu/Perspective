import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody,  CardHeader, Flex, Heading, IconButton,  Input,
         Popover,  PopoverArrow,  PopoverBody,  PopoverCloseButton,  PopoverContent,  PopoverHeader,
         PopoverTrigger,  Portal,  Spinner,  Text } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import axiosInstance from "../services/axios-instance";
import { CanceledError } from "axios";
import abbreviateNumber from "../services/abreviateNumber";
import Country from "../model/Country";

interface Props {
    onDelete: (cardId: string, name: string) => void;
    onEdit: (oldName: string, newName: string) => void;
    setFocus: (focus: boolean) => void;
    index: number;
    countryList: Country[];
    countryEntity: Country;
    setValidCards: (value: number) => void;
    validCards: number;
}

function CountryCard({ onDelete, onEdit, setFocus, index, countryList, countryEntity, setValidCards, validCards}: Props) {

    const editInputReference = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading]= useState(false);
    const [wasFound, setWasFound] = useState(true);
    
    // Function to return linebreak for conditional rendering. In case the capital is shown

    function showBreakrow() {
        return(<br/>)
    }

    function showCapital() {
        return(<Text as="span" fontWeight="medium"> Capital: </Text>)
    }

    useEffect(() => {
        
        // Don't make any requests to the API if the component has already been rendered.
        // Or if it's not absolutely necessary.

        if (!countryEntity.wasRendered) {

            setIsLoading(true)

            axiosInstance.get<Country[]>("name/" + countryEntity.name.inputName)

            .then((response) => {

                // When we find a result (country) we set all the info needed to the object using the setters

                countryEntity.setFound(true);
                countryEntity.setCommonName(response.data[0].name.common);
                countryEntity.setOfficialName(response.data[0].name.official);
                countryEntity.setPopulation(response.data[0].population);
                countryEntity.setLanguages(response.data[0].languages);
                countryEntity.setContinents(response.data[0].continents);
                countryEntity.setArea(response.data[0].area);
                countryEntity.setCapital(response.data[0].capital);

                setIsLoading(false);
                setWasFound(true);
                
                // Increment number of valid cards available for comparison

                setValidCards(validCards += 1);
            })
            
            .catch(err => {

                // Clean up in case of cancellation
                if(err instanceof CanceledError) return;

                if(err.response.status == 404) {

                    // We update the state when the country is not found and stop trying to load

                    setWasFound(false);                                
                    setIsLoading(false);
                    
                    // Only decrement from valid cards if it was edited to something that couldn't be found
                    
                    if(countryEntity.wasEdited) {
                        setValidCards(validCards -= 1);
                    }

                    countryEntity.setCommonName("Not found")
                    countryEntity.setFound(false)
                }
                return
            })

            // Regardless of the outcome of our request, the card has now been rendered

            countryEntity.setWasRendered(true);
        }
        
        // Re-render in case the inputed name of a country changes (edit)

    }, [countryEntity.name.inputName]);
    
    return(

        <Card backgroundColor="lightblue">

            <CardHeader display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                <Box display="flex" gap={3} alignItems="center">

                    <Heading as="h3" fontSize={20}> { countryEntity.name.common} </Heading>

                    <Popover>
                        <PopoverTrigger>
                            <IconButton icon={<EditIcon/>} aria-label="close" size="sm" opacity="50%" />
                        </PopoverTrigger>

                        <Portal>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader> Edit name </PopoverHeader>
                                <PopoverCloseButton />

                                <PopoverBody  flexDirection="column">

                                    <form onSubmit={
                                        (event) => {
                                            event.preventDefault();

                                            if(editInputReference.current) {
                                                onEdit(index.toString(), editInputReference.current.value);
                                                editInputReference.current.value = "";
                                            }
                                            
                                            setFocus(true);
                                        }}>

                                        <Flex direction="column">

                                            {/* The value wasn't re-rendering here because I was using defaultValue instead of value */}

                                            <Input placeholder={countryEntity.name.inputName} ref={editInputReference} focusBorderColor="none"/>
                                            <Button type="submit" marginTop={2} alignSelf="flex-end"> Save </Button>

                                        </Flex>
                                    </form>

                                </PopoverBody>
                            </PopoverContent>
                        </Portal>

                    </Popover>

                </Box>

                { /* We use this button to execute the callback and delete the card, as well as re-focus on input */ }

                <IconButton onClick={() => {onDelete(index.toString(), countryEntity.name.common) }} icon={<CloseIcon />} aria-label="close" size="sm" />
                    
            </CardHeader>


            <CardBody display="flex">

                { isLoading && <Spinner justifySelf="center" alignSelf="center" marginX="auto"/>}
                { countryEntity.wasFound && !isLoading && 

                    <Text>
                        <Text as="span" fontWeight="medium">Official</Text>: { countryEntity.name.official } <br/> 

                        {/* Only show a countries capital if that data is available. If not just ignore it altogether */}
                        
                        {countryEntity.capital && showCapital()}
                        {countryEntity.capital &&  countryList[index]?.capital.map((c) => c + ", ") }
                        {countryEntity.capital && showBreakrow()}

                        {/* Population: { countryData?.population} <br/> */}

                        <Text as="span" fontWeight="medium">Population:</Text> { countryEntity.population  && abbreviateNumber(countryList[index].population)} <br/>
                        <Text as="span" fontWeight="medium">Continent:</Text> { countryEntity.continents.map(c => c + " ") } <br/>
                        
                        { /* Using the object.values method to get all the values in an array regardless of the keys,
                            and then iterating through that array to show the values. */ }

                        <Text as="span" fontWeight="medium">Languages:</Text> {  countryEntity.languages && Object.values(countryEntity.languages).map((key) => key + ", ") } <br/>

                        <Text as="span" fontWeight="medium">Area Km²:</Text> {countryEntity.area && abbreviateNumber(countryList[index].area)}
                    </Text>
               
                }


                { !isLoading && !countryEntity.wasFound && <Text> Country not found, update your query </Text>}
            </CardBody>
        </Card>
    )
}

export default CountryCard;