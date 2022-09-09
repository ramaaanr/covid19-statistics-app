import getCountries from '../services/get-countries';
import getCountryData from '../services/get-country-data';

const main = () => {
  renderSelectCountry();
  renderGlobalCases();
  $('#btn-search').on('click', () => searchCountry());
};

const searchCountry = async () => {
  const country = $('#select-country').val();
  try {
    const countryData = await getCountryData(country);
    renderCountryCases(countryData);
  } catch (error) {
    alert(error);
  }
};

const renderGlobalCases = (data) => {
  $('#global-confirmed').text('111');
  $('#global-recovered').text('111');
  $('#global-deaths').text('111');
};

const renderCountryCases = (data) => {
  $('#country-confirmed').text(`${data.confirmed}`);
  $('#country-recovered').text(`${data.recovered}`);
  $('#country-deaths').text(`${data.deaths}`);
};

const renderSelectCountry = async () => {
  try {
    const countryData = await getCountries();
    const selectElement = $('#select-country');
    countryData.forEach((country) => {
      selectElement.append(`<option value="${country}">${country}</option>`);
    });
  } catch (error) {
    alert(error);
  }
};

export default main;
