import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useEffect, useRef } from "react";


function SearchBox() {

    const inputReference = useRef<HTMLInputElement>(null); 

    useEffect(() => {
        if(inputReference.current) inputReference.current.focus()
    }, []);

    return(
        <Box border="2 white solid" width="100%">
            <form onSubmit={(event) => event.preventDefault()}>

                <InputGroup >
                    <Input ref={inputReference} size="lg" minWidth={5} placeholder="Name a country" focusBorderColor="none"/>

                    <InputRightElement  marginTop={1}>
                        <button type="submit"><SearchIcon boxSize={5} my="auto" />  </button>
                    </InputRightElement>
                </InputGroup>

            </form>
        </Box>
    )

}

export default SearchBox;
