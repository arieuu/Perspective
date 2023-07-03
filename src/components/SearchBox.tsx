import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface Props {
    onSubmit: (name: string) => void;
}

function SearchBox({ onSubmit }: Props) {

    const inputReference = useRef<HTMLInputElement>(null); 

    useEffect(() => {
        if(inputReference.current) inputReference.current.focus()
    }, []);


    return(
        <Box border="2 white solid" width="100%">
            <form onSubmit={(event) => {
                event.preventDefault();                         // Preventing page from updating

                if(inputReference.current) {
                    onSubmit(inputReference.current.value);
                    inputReference.current.value = ""           // Clean up the input after commiting
                }
            }}>

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
