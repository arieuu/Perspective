import { CloseIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardHeader, Heading, IconButton, Text } from "@chakra-ui/react";

interface Props {
    name: string;
    onDelete: (name: string) => void;
}

function CountryCard({name, onDelete}: Props) {
    return(
        <Card id="name">
            <CardHeader display="flex" justifyContent="space-between" alignItems="center">
                <Heading as="h3" fontSize={20}> {name} </Heading>

                { /* We use this button to execute the callback and delete the card, as well as re-focus on input */ }

                <IconButton onClick={() => onDelete(name)} icon={<CloseIcon />} aria-label="close" size="sm" />
                    
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