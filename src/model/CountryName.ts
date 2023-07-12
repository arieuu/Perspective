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

export default CountryName;