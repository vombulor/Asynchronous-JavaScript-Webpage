const countrySelect = document.getElementById("countrySelect");
const countryInfo = document.getElementById("countryInfo");

const allCountriesURL = "https://restcountries.com/v3.1/all";
const countryByNameURL = "https://restcountries.com/v3.1/name/";

const loadCountries = async () => {
};

const getCountryDetails = async (countryName) => {
};

countrySelect.addEventListener("change", (event) => {
    const selectedCountry = event.target.value;

    if (selectedCountry) {
        getCountryDetails(selectedCountry);
    } else {
        countryInfo.innerHTML = "<p>Select a country to see info.</p>";
    }
});

loadCountries();
