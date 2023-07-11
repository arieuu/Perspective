import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { BsPeopleFill } from "react-icons/bs";
import { TbRulerMeasure } from "react-icons/tb";
import { FaLanguage } from "react-icons/fa";
import { BiSolidMap} from "react-icons/bi";
import Country from "../types/Country";

interface Props {
    setCountryName: (newArray: string[]) => void;
    setCountryData: (newArray: Country[]) => void;
    countryNames: string[];
    countryData: Country[];
}

function ComparisonButtons({ setCountryName, countryNames, countryData, setCountryData }:Props) {
    
    // The spans around the react icons are needed to work with the tooltips
    
    return(
        <>
        <Text justifySelf="flex-end" alignSelf="flex-end" mb={3} >compare countries by: </Text>
        <Flex flexDirection="row" justifySelf="flex-end" alignSelf="flex-end" gap={2}>

            <Tooltip hasArrow bg={"gray.900"} label="Population" aria-label='A tooltip'>
                <span> <IconButton onClick={() => setCountryData([...countryData].reverse())} as={BsPeopleFill} boxSize={8} padding={"1.5"} mb={0}  aria-label="close" size="sm" justifySelf="flex-end" alignSelf="flex-end"/> </span>
            </Tooltip>

            <Tooltip hasArrow bg={"gray.900"} label="Area" aria-label='A tooltip'>
                <span> <IconButton as={TbRulerMeasure} boxSize={8} padding={"1.5"} mb={0}  aria-label="close" size="sm" justifySelf="flex-end" alignSelf="flex-end"/> </span>
            </Tooltip>

            <Tooltip hasArrow bg={"gray.900"} label="Languages spoken" aria-label='A tooltip'>
                <span> <IconButton as={FaLanguage} boxSize={8} padding={"1.5"} mb={0}  aria-label="close" size="sm" justifySelf="flex-end" alignSelf="flex-end"/> </span>
            </Tooltip>

            <Tooltip hasArrow bg={"gray.900"} label="Number of capitals" aria-label='A tooltip'>
                <span> <IconButton as={BiSolidMap} boxSize={8} padding={"1.5"} mb={0}  aria-label="close" size="sm" justifySelf="flex-end" alignSelf="flex-end"/> </span>
            </Tooltip>
        </Flex>
        </>
    )

}

export default ComparisonButtons; 