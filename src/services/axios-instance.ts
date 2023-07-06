import axios from "axios";

// Exporting an axios instance so that it can be accessed anywhere

export default axios.create({
    baseURL: "https://restcountries.com/v3.1/",
});