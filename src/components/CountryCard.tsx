import { CloseIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardHeader, Heading, IconButton, Text } from "@chakra-ui/react";


function CountryCard() {
    return(
        <Card minWidth={50}>
            <CardHeader display="flex" justifyContent="space-between" alignItems="center">
                <Heading as="h3" fontSize={20}> Saudi Arabia</Heading>
                <IconButton icon={<CloseIcon />} aria-label="close" size="sm" />
                    
            </CardHeader>

            <CardBody>
                <Text>
               Name: Saudi Arabia <br /> 
               Population: 23.2532 <br />
               Official: Peoples republic of saudi arabia
               Name: Saudi Arabia <br /> 
               Name: Saudi Arabia <br /> 
               Name: Saudi Arabia <br /> 
               Population: 23.2532 <br />
               Population: 23.2532 <br />
               Population: 23.2532 <br />
               </Text>
            </CardBody>
        </Card>
    )
}

export default CountryCard;