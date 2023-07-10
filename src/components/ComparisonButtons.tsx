import { Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { BsPeopleFill } from "react-icons/bs";
import { TbRulerMeasure } from "react-icons/tb";
import { FaLanguage, FaSearchLocation } from "react-icons/fa";
import { BiSolidMap} from "react-icons/bi";


function ComparisonButtons() {
    
    // The spans around the react icons are needed to work with the tooltips
    
    return(
        <>
        <Text justifySelf="flex-end" alignSelf="flex-end" mb={3} >compare countries: </Text>
        <Flex flexDirection="row" justifySelf="flex-end" alignSelf="flex-end" gap={2}>

        <Tooltip hasArrow bg={"gray.900"} label="By population" aria-label='A tooltip'>
            <span> <IconButton as={BsPeopleFill} boxSize={8} padding={"1.5"} mb={0}  aria-label="close" size="sm" justifySelf="flex-end" alignSelf="flex-end"/> </span>
        </Tooltip>

        <Tooltip hasArrow bg={"gray.900"} label="By area" aria-label='A tooltip'>
            <span> <IconButton as={TbRulerMeasure} boxSize={8} padding={"1.5"} mb={0}  aria-label="close" size="sm" justifySelf="flex-end" alignSelf="flex-end"/> </span>
        </Tooltip>

        <Tooltip hasArrow bg={"gray.900"} label="By languages spoken" aria-label='A tooltip'>
            <span> <IconButton as={FaLanguage} boxSize={8} padding={"1.5"} mb={0}  aria-label="close" size="sm" justifySelf="flex-end" alignSelf="flex-end"/> </span>
        </Tooltip>

        <Tooltip hasArrow bg={"gray.900"} label="By number of capitals" aria-label='A tooltip'>
            <span> <IconButton as={BiSolidMap} boxSize={8} padding={"1.5"} mb={0}  aria-label="close" size="sm" justifySelf="flex-end" alignSelf="flex-end"/> </span>
        </Tooltip>
        </Flex>
        </>
    )

}

export default ComparisonButtons; 