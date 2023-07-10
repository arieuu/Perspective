import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody,  CardHeader,  Flex,  Heading, IconButton,  Input,
         Popover,  PopoverArrow,  PopoverBody,  PopoverCloseButton,  PopoverContent,  PopoverHeader,
         PopoverTrigger,  Portal,  Spinner,  Text } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import axiosInstance from "../services/axios-instance";
import { CanceledError } from "axios";
import abbreviateNumber from "../services/abreviateNumber";

interface Props {
    name: string;
    onDelete: (cardId: string, name: string) => void;
    onEdit: (oldName: string, newName: string) => void;
    setFocus: (focus: boolean) => void;
    index: number;
}

interface Country {
    name: Name;
    capital: string[];
    continents: string[];
    population: string;
    languages: object;          // The keys will not be known before hand, so we just use a generic object
    area: string;
}

interface Name {
    common: string;
    official: string;
}


function CountryCard({name, onDelete, onEdit, setFocus, index}: Props) {

    const editInputReference = useRef<HTMLInputElement>(null);
    const [countryData, setCountryData] = useState<Country>();
    const [isLoading, setIsLoading]= useState(false);
    const [wasFound, setWasFound] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        axiosInstance.get<Country[]>("name/" + name )
        .then((response) => {
            setCountryData(response.data[0]); // Return the first country found
            setIsLoading(false);
            setWasFound(true);
        })
        
        .catch(err => {
            if(err instanceof CanceledError) return;                // Clean up in case of cancellation

            if(err.response.status == 404) {
                // We update the state when the country is not found and stop trying to load
                setWasFound(false);                                
                setIsLoading(false);
                const emptyCountry = {name: {common: "Not found"} as Name} as Country
                setCountryData(emptyCountry)
            }
            return
        })
    
    }, [name]); // In case the dependency of name changes the component will re-render (that helps when editing)
    
    return(
        <Card backgroundColor="lightblue">
            <CardHeader display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                <Box display="flex" gap={3} alignItems="center">
                    <Heading as="h3" fontSize={20}> { countryData?.name.common } </Heading>

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
                                        <Input defaultValue={name} ref={editInputReference} focusBorderColor="none"/>
                                        <Button type="submit" marginTop={2} alignSelf="flex-end"> Save </Button>
                                        </Flex>
                                    </form>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>

                    </Popover>

                </Box>

                { /* We use this button to execute the callback and delete the card, as well as re-focus on input */ }

                <IconButton onClick={() => onDelete(index.toString(), name)} icon={<CloseIcon />} aria-label="close" size="sm" />
                    
            </CardHeader>


            <CardBody display="flex">
                { isLoading && <Spinner justifySelf="center" alignSelf="center" marginX="auto"/>}
                
                { wasFound && !isLoading && 

                <Text>
                    Official: { countryData?.name.official} <br/> 
                    Capital: { countryData?.capital.map((c) => c + ", ")} <br/>
                    {/* Population: { countryData?.population} <br/> */}
                    Population: { countryData?.population && abbreviateNumber(countryData.population)} <br/>
                    Continent: { countryData?.continents.map(c => c + " ") } <br/>
                    
                    { /* Using the object.values method to get all the values in an array regardless of the keys,
                        and then iterating through that array to show the values. */ }
                    Languages: {  countryData?.languages && Object.values(countryData?.languages).map((key) => key + ", ") } <br/>

                    { /* Area: { countryData?.area } <br/> */ }
                    Area Km²: {countryData?.area && abbreviateNumber(countryData.area)}
               </Text>
               
                }


                { !isLoading && !wasFound && <Text> Country not found, update your query </Text>}
            </CardBody>
        </Card>
    )
}

export default CountryCard;