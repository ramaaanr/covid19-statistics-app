import getCountries from '../services/get-countries';
import getCountryData from '../services/get-country-data';
import getGlobalData from '../services/get-global-data';

const main = () => {
  renderSelectCountry();
  renderGlobalCases();
  $('#select-country').on('change', () => {
    if ($('#select-country').val() !== '---') {
      $('.select-country-container').removeClass('d-none');
      renderCountryCases();
    }
  });
};

const renderChart = (country) => {
  $('#pie-chart').remove();
  $('.chart-container').append(`<canvas id="pie-chart"></canvas>`);
  const chart = $('#pie-chart');
  const DATA_COUNT = 1;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const labels = ['Confirmed', 'Recovered', 'Deaths'];
  const data = {
    labels: labels,
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
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  };

  new Chart(chart, config);
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
    const lastUpdate = moment(countryData.lastUpdate).format('LLL');

    $('#country-confirmed').text(countryData.confirmed.toLocaleString('en-Us'));
    $('#country-recovered').text(countryData.recovered.toLocaleString('en-Us'));
    $('#country-deaths').text(countryData.deaths.toLocaleString('en-Us'));
    $('#country-last-update').text(`Last Update: ${lastUpdate}`);
    countryData.country = country;
    renderChart(countryData);
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

export default main;
