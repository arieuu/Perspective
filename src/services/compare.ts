import Country from "../model/Country";

function population(countries: Country[]) {
    const altered: Country[] = []; // Copy an array and mutate it
    const values = countries.map((country) => parseInt(country.population))

    console.log(values);

    const sortedValues = values.slice().sort((a, b) => b - a);

    console.log(sortedValues)

    sortedValues.map((value) => {
        countries.map((country) => {
            if(country.population == value.toString()) {
                altered.push(country);
            }
        })
    });

    return altered;
}

function compareCountries(countries: Country[], parameter: string) {
    let altered = countries; // Just so it has the expected value to begin with

    switch(parameter) {
        case "population":
            altered = population(countries);
    }

    return {
        "original": countries,
        "altered": altered
    };
}

export default compareCountries;