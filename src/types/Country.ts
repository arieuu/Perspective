/*
export default interface Country {
    name: countryName;
    capital: string[];
    continents: string[];
    population: string;
    languages: object;          // The keys will not be known beforehand, so we just use a generic object
    area: string;
}
*/

class CountryName {
    common: string;
    official: string;
    inputName: string;

    constructor(inputName: string) {
        this.inputName = inputName;
    }

    setInputName(name: string) {
        this.inputName = name;
    }
}

class Country {
    name: countryName;
    capital: string[];
    continents: string[];
    population: string;
    languages: object;
    area: string;
    wasFound = false;
    wasRendered = false;

    constructor(simpleName: string) {
        this.name = new CountryName(simpleName)
    }

    setInputName(newName: string) {
        this.name.inputName = newName;
    }

    setCommonName(newName: string) {
        this.name.common = newName;
    }

    setOfficialName(value: string) {
        this.name.official = value;
    }

    setPopulation(value: string) {
        this.population = value;
    }

    setLanguages(value: object) {
        this.languages = value;
    }

    setFound(value: boolean) {
        this.wasFound = value; 
    }

    setWasRendered(value: boolean) {
        this.wasRendered = value;
    }

    setContinents(value: string[]) {
        this.continents = value;
    }

    setArea(value: string) {
        this.area = value;
    }

    setCapital(value: string[]) {
        this.capital = value;
    }

}

export default Country;