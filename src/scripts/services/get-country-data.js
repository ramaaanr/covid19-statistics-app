const baseUrl = 'https://covid19.mathdro.id/api';
const getCountryData = (country) => fetch(`${baseUrl}/countries/${country}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then((responseJson) => {
    const data = {
      confirmed: responseJson.confirmed.value,
      deaths: responseJson.deaths.value,
      recovered: responseJson.recovered.value,
      lastUpdate: responseJson.lastUpdate,
    };
    return Promise.resolve(data);
  })
  .catch((error) => Promise.reject(error));

export default getCountryData;
