import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { BsPeopleFill } from "react-icons/bs";
import { TbRulerMeasure } from "react-icons/tb";
import { FaLanguage } from "react-icons/fa";
import { BiSolidMap} from "react-icons/bi";
import Country from "../model/Country";
import compareCountries from "../services/compare";

interface Props {
    setCountryList: (newArray: Country[]) => void;
    countryList: Country[];
    setComparisonTitle: (title: string) => void;
}

function ComparisonButtons({ countryList, setCountryList, setComparisonTitle}:Props) {
    
    // The spans around the react icons are needed to work with the tooltips
    
    return(
        <>
        <Text justifySelf="flex-end" alignSelf="flex-end" mb={3} >compare countries by: </Text>
        <Flex flexDirection="row" justifySelf="flex-end" alignSelf="flex-end" gap={2}>
            

            <Tooltip hasArrow bg={"gray.900"} label="Population" aria-label='A tooltip'>
                <span> <IconButton onClick={() => {
                    setCountryList(compareCountries(countryList, "population").altered),
                    setComparisonTitle("Population")
                }} 
                
                as={BsPeopleFill} boxSize={8} padding={"1.5"} mb={0}  aria-label="close" size="sm" justifySelf="flex-end" alignSelf="flex-end"/> </span>
            </Tooltip>


            <Tooltip hasArrow bg={"gray.900"} label="Area" aria-label='A tooltip'>
                <span> <IconButton onClick={() => {
                    setCountryList(compareCountries(countryList, "area").altered),
                    setComparisonTitle("Area")
                }} 
                as={TbRulerMeasure} boxSize={8} padding={"1.5"} mb={0}  aria-label="close" size="sm" justifySelf="flex-end" alignSelf="flex-end"/> </span>
            </Tooltip>


            <Tooltip hasArrow bg={"gray.900"} label="Languages spoken" aria-label='A tooltip'>
                <span> <IconButton onClick={() => {
                    setComparisonTitle("Languages")
                }}
                as={FaLanguage} boxSize={8} padding={"1.5"} mb={0}  aria-label="close" size="sm" justifySelf="flex-end" alignSelf="flex-end"/> </span>
            </Tooltip>


            <Tooltip hasArrow bg={"gray.900"} label="Number of capitals" aria-label='A tooltip'>
                <span> <IconButton onClick={() => {
                    setComparisonTitle("Capitals")
                }} 
                as={BiSolidMap} boxSize={8} padding={"1.5"} mb={0}  aria-label="close" size="sm" justifySelf="flex-end" alignSelf="flex-end"/> </span>
            </Tooltip>
        </Flex>
        </>
    )

}

export default ComparisonButtons; 