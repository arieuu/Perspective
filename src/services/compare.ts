import Country from "../model/Country";

function population(countries: Country[]) {
    const altered: Country[] = [];
    const values = countries.map((country) => parseInt(country.population))

    console.log(values);

    // Sort list from biggest to smallest
    const sortedValues = values.slice().sort((a, b) => b - a);

    console.log(sortedValues)

    sortedValues.map((value) => {
        countries.map((country) => {
            if(parseInt(country.population) == value) {
                altered.push(country);
            }
        });
    });

    return altered;
}


function area(countries: Country[]) {
    const altered: Country[] = [];
    const values = countries.map((country) => parseInt(country.area))

    console.log(values);

    // Sort list from biggest to smallest
    const sortedValues = values.slice().sort((a, b) => b - a);

    console.log(sortedValues)

    sortedValues.map((value) => {
        countries.map((country) => {
            if(parseInt(country.area) == value) {
                altered.push(country);
            }
        });
    });

    return altered;
}


function languages(countries: Country[]) {
    const altered: Country[] = [];
    
    // Here we get the length of the object as the value
    const values = countries.map((country) => Object.keys(country.languages).length)

    console.log(values);

    // Sort list from biggest to smallest
    const sortedValues = values.slice().sort((a, b) => b - a);

    console.log(sortedValues)

    sortedValues.map((value) => {
        countries.map((country) => {
            if(Object.keys(country.languages).length == value) {
                if(!altered.includes(country)) {  // Avoiding repeated values
                    altered.push(country);
                }
            }
        });
    });

    return altered;
}


function capitals(countries: Country[]) {
    const altered: Country[] = [];
    
    // Here we get the length of the object as the value
    const values = countries.map((country) => country.capital.length)

    console.log(values);

    // Sort list from biggest to smallest
    const sortedValues = values.slice().sort((a, b) => b - a);

    console.log(sortedValues)

    sortedValues.map((value) => {
        countries.map((country) => {
            if(country.capital.length == value) {
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