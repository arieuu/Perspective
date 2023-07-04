import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody,  CardHeader,  Flex,  Heading, IconButton,  Input,
         Popover,  PopoverArrow,  PopoverBody,  PopoverCloseButton,  PopoverContent,  PopoverHeader,
         PopoverTrigger,  Portal,  Text } from "@chakra-ui/react";

import { useRef } from "react";

interface Props {
    name: string;
    onDelete: (cardId: string, name: string) => void;
    onEdit: (oldName: string, newName: string) => void;
    setFocus: (focus: boolean) => void;
    index: number;
}

function CountryCard({name, onDelete, onEdit, setFocus, index}: Props) {

    const editInputReference = useRef<HTMLInputElement>(null);
    
    return(
        <Card>
            <CardHeader display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                <Box display="flex" gap={3} alignItems="center">
                    <Heading as="h3" fontSize={20}> {name} </Heading>

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