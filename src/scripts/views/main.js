import getCountries from '../services/get-countries';
import getCountryData from '../services/get-country-data';
import getGlobalData from '../services/get-global-data';

const main = () => {
  renderSelectCountry();
  renderGlobalCases();
  $('#btn-search').on('click', () => {
    $('.select-country-container').removeClass('d-none');
    searchCountry();
  });
};

const searchCountry = async () => {
  const country = $('#select-country').val();
  try {
    const countryData = await getCountryData(country);
    renderCountryCases(countryData);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: error,
      showConfirmButton: false,
      text: 'Something went wrong! Please Try Again Later',
    });
  }
};

const renderGlobalCases = async () => {
  try {
    const globalData = await getGlobalData();

    $('#global-confirmed').text(globalData.confirmed.toLocaleString('en-Us'));
    $('#global-recovered').text(globalData.recovered.toLocaleString('en-Us'));
    $('#global-deaths').text(globalData.deaths.toLocaleString('en-Us'));
    const lastUpdate = moment(globalData.lastUpdate).format('LLL');

    $('#global-last-update').text(`Last Update: ${lastUpdate}`);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: error,
      showConfirmButton: false,
      text: 'Something went wrong! Please Try Again Later',
    });
  }
};

const renderCountryCases = (countryData) => {
  const lastUpdate = moment(countryData.lastUpdate).format('LLL');

  $('#country-confirmed').text(countryData.confirmed.toLocaleString('en-Us'));
  $('#country-recovered').text(countryData.recovered.toLocaleString('en-Us'));
  $('#country-deaths').text(countryData.deaths.toLocaleString('en-Us'));
  $('#country-last-update').text(`Last Update: ${lastUpdate}`);
};

const renderSelectCountry = async () => {
  try {
    const countryData = await getCountries();
    const selectElement = $('#select-country');
    countryData.forEach((country) => {
      selectElement.append(`<option value="${country}">${country}</option>`);
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: error,
      showConfirmButton: false,
      text: 'Something went wrong! Please Try Again Later',
    });
  }
};

export default main;
