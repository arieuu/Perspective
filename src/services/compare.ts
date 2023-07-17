import Country from "../model/Country";
import containsObject from "./containsObject";


function population(countries: Country[]) {
    const altered: Country[] = [];
    const values = countries.map((country) => parseInt(country.population))

    // Sort list from biggest to smallest

    const sortedValues = values.slice().sort((a, b) => b - a);

    sortedValues.map((value) => {
        
        countries.map((country) => {
            
            if(parseInt(country.population) == value && country.wasFound) {

                if(!containsObject(country, altered)) {     // Checking for duplicates before adding
                    altered.push(country);
                }
            }
        });
    });

    console.log(altered)

    return altered;
}


function area(countries: Country[]) {
    const altered: Country[] = [];
    const values = countries.map((country) => parseInt(country.area))

    // Sort list from biggest to smallest

    const sortedValues = values.slice().sort((a, b) => b - a);

    sortedValues.map((value) => {
        countries.map((country) => {

            if(parseInt(country.area) == value && country.wasFound) {

                if(!containsObject(country, altered)) {      // Checking for duplicates first
                    altered.push(country);
                }
            }
        });
    });

    return altered;
}


function languages(countries: Country[]) {
    const altered: Country[] = [];
    
    // Here we get the length of the object as the value
    
    // To prevent bugs we make sure the empty objects don't make it to the comparison statements

    const values = countries.map((country) => country.wasFound ? Object.keys(country.languages).length : 0)

    // Sort list from biggest to smallest

    const sortedValues = values.slice().sort((a, b) => b - a);

    sortedValues.map((value) => {
        
        countries.map((country) => {

            if(!country.wasFound) return

            if(Object.keys(country.languages).length == value) {

                if(!altered.includes(country)) {  // Avoiding repeated values

                    if(country.wasFound) {
                        altered.push(country);
                    }
                }
            }
        });
    });

    return altered;
}


function capitals(countries: Country[]) {
    const altered: Country[] = [];
    
    // Here we get the length of the object as the value

    const values = countries.map((country) => country.wasFound ? country.capital.length : 0)

    // Sort list from biggest to smallest

    const sortedValues = values.slice().sort((a, b) => b - a);

    sortedValues.map((value) => {

        countries.map((country) => {

            if(!country.wasFound) return

            if(country.capital.length == value && country.wasFound) {
                if(!altered.includes(country)) {  // Avoiding repeated values
                    altered.push(country);
                }
            }
        });
    });

    return altered;
}

function compareCountries(countries: Country[], parameter: string) {
    let altered: Country[] = []; // An array of country entities

    switch(parameter) {
        case "population":
            altered = population(countries);
            break; 

        case "area":
            altered = area(countries);
            break;
            
        case "languages":
            altered = languages(countries);
            break;

        case "capitals":
            altered = capitals(countries);
            break;
    }

    return {
        "original": countries,
        "altered": altered
    };
}

export default compareCountries;