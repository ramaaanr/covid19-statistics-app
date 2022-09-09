const baseUrl = 'https://covid19.mathdro.id/api';
const getCountryData = (country) => {
  return fetch(`${baseUrl}/countries/${country}`)
    .then((response) => response.json())
    .then((responseJson) => {
      const data = {
        confirmed: responseJson.confirmed.value,
        deaths: responseJson.deaths.value,
        recovered: responseJson.recovered.value,
      };
      return Promise.resolve(data);
    })
    .catch((error) => Promise.reject(error));
};

export default getCountryData;
