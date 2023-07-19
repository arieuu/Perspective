import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface Props {
    onSubmit: (name: string) => void;
    focus: boolean
}

function SearchBox({ onSubmit, focus }: Props) {

    const inputReference = useRef<HTMLInputElement>(null); 

    useEffect(() => {
        if(inputReference.current) inputReference.current.focus()
    }, []);

    // Check if this state changes to true, if so, that means a card has been deleted.
    // We then return focus to this input (Since the user clicked away, we nee to get them into typing)

    if(focus) {
        if(inputReference.current) {
            inputReference.current.focus();
        }
    }


    return(
        <Box width="100%">
            <form onSubmit={(event) => {

                // We prevent the page from reloading and clean up the input field
                event.preventDefault();           

                if(inputReference.current) {
                    onSubmit(inputReference.current.value.trim());
                    inputReference.current.value = "";
                }
            }}>

            <Flex flexDirection="column" maxWidth="400px" marginX="auto">

                <InputGroup marginX="auto">
                    <Input ref={inputReference} size="lg" placeholder="Name a country (ex: cape verde)" focusBorderColor="none"/>

                    <InputRightElement  marginTop={1}>
                        <button type="submit"> <SearchIcon boxSize={5} my="auto" /> </button>
                    </InputRightElement>
                </InputGroup>

                <Text mt={1} alignSelf="flex-end" opacity="50%"> Powered by Rest Countries API</Text>

            </Flex>

            </form>
        </Box>
    )

}

export default SearchBox;
