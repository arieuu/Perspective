export default interface Country {
    name: countryName;
    capital: string[];
    continents: string[];
    population: string;
    languages: object;          // The keys will not be known beforehand, so we just use a generic object
    area: string;
}

export interface countryName {
    common: string;
    official: string;
}