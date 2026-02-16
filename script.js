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
    try {
        countryInfo.innerHTML = "<p>Loading...</p>";

        const response = await fetch(`${countryByNameURL}${countryName}?fields=name,flags,capital,population,region,languages,currencies`);

        if (!response.ok) {
            throw new Error("Failed to fetch country details");
        }

        const data = await response.json();
        const country = data[0];

        const languages = country.languages
            ? Object.values(country.languages).join(", ")
            : "N/A";

        const currencies = country.currencies
            ? Object.values(country.currencies)
                  .map(currency => `${currency.name} (${currency.symbol || ""})`)
                  .join(", ")
            : "N/A";

        const population = country.population.toLocaleString();

        countryInfo.innerHTML = `
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <div class="info-item"><strong>Name:</strong> ${country.name.common}</div>
            <div class="info-item"><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</div>
            <div class="info-item"><strong>Population:</strong> ${population}</div>
            <div class="info-item"><strong>Region:</strong> ${country.region}</div>
            <div class="info-item"><strong>Languages:</strong> ${languages}</div>
            <div class="info-item"><strong>Currencies:</strong> ${currencies}</div>
        `;

    } catch (error) {
        countryInfo.innerHTML = "<p>Error loading country details.</p>";
    }
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
