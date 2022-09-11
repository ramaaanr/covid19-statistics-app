/* eslint-disable no-undef */
import getCountries from '../services/get-countries';
import getCountryData from '../services/get-country-data';
import getGlobalData from '../services/get-global-data';

const renderChart = (country) => {
  $('#pie-chart').remove();
  $('.chart-container').append('<canvas id="pie-chart"></canvas>');
  const chart = $('#pie-chart');

  const labels = ['Confirmed', 'Recovered', 'Deaths'];
  const data = {
    labels,
    datasets: [
      {
        label: `Covid-19 data for ${country.country}`,
        data: [country.confirmed, country.recovered, country.deaths],
        backgroundColor: ['#0dcaf0', '#198754', '#dc3545'],
      },
    ],
  };

  const config = {
    type: 'bar',
    data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  };

  return new Chart(chart, config);
};

const renderGlobalCases = async () => {
  try {
    const globalData = await getGlobalData();
    globalData.confirmed = globalData.confirmed.toLocaleString();
    globalData.deaths = globalData.deaths.toLocaleString();
    globalData.recovered = globalData.recovered.toLocaleString();
    globalData.lastUpdate = moment(globalData.lastUpdate).format('LLL');
    document.querySelector('global-card-container').data = globalData;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: error,
      showConfirmButton: false,
      text: 'Something went wrong! Please Try Again Later',
    });
  }
};

const renderCountryCases = async () => {
  const country = $('#select-country').val();
  try {
    const countryData = await getCountryData(country);
    countryData.country = country;
    renderChart(countryData);
    countryData.confirmed = countryData.confirmed.toLocaleString();
    countryData.deaths = countryData.deaths.toLocaleString();
    countryData.recovered = countryData.recovered.toLocaleString();
    countryData.lastUpdate = moment(countryData.lastUpdate).format('LLL');
    document.querySelector('country-card-container').data = countryData;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: error,
      showConfirmButton: false,
      text: 'Something went wrong! Please Try Again Later',
    });
  }
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

const main = () => {
  renderSelectCountry();
  renderGlobalCases();
  $('#select-country').on('change', () => {
    if ($('#select-country').val() !== '---') {
      $('country-card-container').removeClass('d-none');
      $('.chart-container').removeClass('d-none');
      renderCountryCases();
    }
  });
};

export default main;
