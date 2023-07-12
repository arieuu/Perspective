import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody,  CardHeader, Flex, Heading, IconButton,  Input,
         Popover,  PopoverArrow,  PopoverBody,  PopoverCloseButton,  PopoverContent,  PopoverHeader,
         PopoverTrigger,  Portal,  Spinner,  Text } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import axiosInstance from "../services/axios-instance";
import { CanceledError } from "axios";
import abbreviateNumber from "../services/abreviateNumber";
import Country, { countryName } from "../types/Country";

interface Props {
    name: string;
    onDelete: (cardId: string, name: string) => void;
    onEdit: (oldName: string, newName: string) => void;
    setFocus: (focus: boolean) => void;
    index: number;
    setCountryData: (countryData: Country[]) => void;
    countryData: Country[];
    countryObject: Country;
}


function CountryCard({ name, onDelete, onEdit, setFocus, index, setCountryData, countryData, countryObject}: Props) {

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
        
        // Don't make any requests to the API if the component has already been rendered

        if(!countryObject.wasRendered) {
            alert("requested")
            setIsLoading(true)
            axiosInstance.get<Country[]>("name/" + name )
            .then((response) => {
                // setCountryData([...countryData, response.data[0]]); // Return the first country found
                countryObject.setFound(true);
                countryObject.setCommonName(response.data[0].name.common);
                countryObject.setOfficialName(response.data[0].name.official);
                countryObject.setPopulation(response.data[0].population);
                countryObject.setLanguages(response.data[0].languages);
                countryObject.setContinents(response.data[0].continents);
                countryObject.setArea(response.data[0].area);
                countryObject.setCapital(response.data[0].capital);
                setIsLoading(false);
                setWasFound(true);
            })
            
            .catch(err => {
                if(err instanceof CanceledError) return;                // Clean up in case of cancellation

                if(err.response.status == 404) {
                    // We update the state when the country is not found and stop trying to load
                    setWasFound(false);                                
                    setIsLoading(false);
                    const emptyCountry = {name: {common: "Not found"} as countryName} as Country
                    // setCountryData([...countryData, emptyCountry])
                    countryObject.setCommonName("Not found")
                    countryObject.setFound(false)
                }
                return
            })

            countryObject.setWasRendered(true);
        }
        
    }, [countryObject.name.inputName]); // In case the dependency of name changes the component will re-render (that helps when editing)
    
    return(
        <Card backgroundColor="lightblue">
            <CardHeader display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                <Box display="flex" gap={3} alignItems="center">
                    <Heading as="h3" fontSize={20}> { countryObject.name.common} </Heading>

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
                                            }
                                            
                                            setFocus(true);
                                        }}>

                                        <Flex direction="column">
                                        {/* The value wasn't re-rendering here because I was using defaultValue instead of value */}
                                        <Input placeholder={countryObject.name.inputName} ref={editInputReference} focusBorderColor="none"/>
                                        <Button type="submit" marginTop={2} alignSelf="flex-end"> Save </Button>
                                        </Flex>
                                    </form>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>

                    </Popover>

                </Box>

                { /* We use this button to execute the callback and delete the card, as well as re-focus on input */ }

                <IconButton onClick={() => {onDelete(index.toString(), countryObject.name.common) }} icon={<CloseIcon />} aria-label="close" size="sm" />
                    
            </CardHeader>


            <CardBody display="flex">
                { isLoading && <Spinner justifySelf="center" alignSelf="center" marginX="auto"/>}
                { countryObject.wasFound && !isLoading && 

                    <Text>
                        <Text as="span" fontWeight="medium">Official</Text>: { countryObject.name.official } <br/> 

                        {/* Only show a countries capital if that data is available. If not just ignore it altogether */}
                        {countryObject.capital && showCapital()}
                        {countryObject.capital &&  countryData[index]?.capital.map((c) => c + ", ") }
                        {countryObject.capital && showBreakrow()}

                        {/* Population: { countryData?.population} <br/> */}

                        <Text as="span" fontWeight="medium">Population:</Text> { countryObject.population  && abbreviateNumber(countryData[index].population)} <br/>
                        <Text as="span" fontWeight="medium">Continent:</Text> { countryObject.continents.map(c => c + " ") } <br/>
                        
                        { /* Using the object.values method to get all the values in an array regardless of the keys,
                            and then iterating through that array to show the values. */ }

                        <Text as="span" fontWeight="medium">Languages:</Text> {  countryObject.languages && Object.values(countryObject.languages).map((key) => key + ", ") } <br/>

                        { /* Area: { countryData?.area } <br/> */ }
                        <Text as="span" fontWeight="medium">Area Km²:</Text> {countryData[index]?.area && abbreviateNumber(countryData[index].area)}
                    </Text>
               
                }


                { !isLoading && !countryObject.wasFound && <Text> Country not found, update your query </Text>}
            </CardBody>
        </Card>
    )
}

export default CountryCard;