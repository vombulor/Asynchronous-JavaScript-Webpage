const countrySelect = document.getElementById("countrySelect");
const countryInfo = document.getElementById("countryInfo");

const allCountriesURL = "https://restcountries.com/v3.1/all?fields=name";
const countryByNameURL = "https://restcountries.com/v3.1/name/";

const loadCountries = async () => {
    try {
        const response = await fetch(allCountriesURL);

        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }

        const data = await response.json();

        data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
        );

        data.forEach(country => {
            const option = document.createElement("option");
            option.value = country.name.common;
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
        });

    } catch (error) {
        countryInfo.innerHTML = "<p>Error loading countries.</p>";
    }
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
