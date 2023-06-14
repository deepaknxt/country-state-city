import { Country, State, City } from "country-state-city";
import { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

export default function Demo() {
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);
  const [countryOptions, setCountryOptions] = useState<Option[]>([]);
  const [stateOptions, setStateOptions] = useState<Option[]>([]);
  const [cityOptions, setCityOptions] = useState<Option[]>([]);

  useEffect(() => {
    const countries = Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountryOptions(countries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value).map(
        (state) => ({
          value: state.isoCode,
          label: state.name,
        })
      );
      setStateOptions(states);
      setSelectedState(null);
      setSelectedCity(null);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState && selectedCountry?.value) {
      const cities = City.getCitiesOfState(
        selectedCountry.value,
        selectedState.value
      ).map((city) => ({
        value: city.name,
        label: city.name,
      }));
      setCityOptions(cities);
      setSelectedCity(null);
    }
  }, [selectedState, selectedCountry?.value]);

  return (
    <div className="App">
      <select
        className="bg-gray-50 mt-1 border border-gray-300 text-gray-900 text-sm block h-[40px] w-full p-2.5"
        name="country"
        id="country"
        value={selectedCountry?.value || ""}
        onChange={(event) => {
          const countryCode = event.target.value;
          const country = countryOptions.find(
            (option) => option.value === countryCode
          );
          setSelectedCountry(country || null);
        }}
      >
        <option value="">Select Country</option>
        {countryOptions.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>

      <select
        className="bg-gray-50 mt-1 border border-gray-300 text-gray-900 text-sm block h-[40px] w-full p-2.5"
        name="state"
        id="state"
        value={selectedState?.value || ""}
        onChange={(event) => {
          const stateCode = event.target.value;
          const state = stateOptions.find(
            (option) => option.value === stateCode
          );
          setSelectedState(state || null);
        }}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {stateOptions.map((state) => (
          <option key={state.value} value={state.value}>
            {state.label}
          </option>
        ))}
      </select>

      <select
        className="bg-gray-50 mt-1 border border-gray-300 text-gray-900 text-sm block h-[40px] w-full p-2.5"
        name="city"
        id="city"
        value={selectedCity?.value || ""}
        onChange={(event) => {
          const cityName = event.target.value;
          const city = cityOptions.find((option) => option.value === cityName);
          setSelectedCity(city || null);
        }}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cityOptions.map((city) => (
          <option key={city.value} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>
    </div>
  );
}
