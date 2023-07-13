import Country from "../model/Country";

function population(countries: Country[]) {
    const altered = countries.slice().reverse(); // Copy an array and mutate it
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