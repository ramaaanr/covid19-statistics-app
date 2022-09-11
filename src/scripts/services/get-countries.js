const baseUrl = 'https://covid19.mathdro.id/api';
const getCountries = () => fetch(`${baseUrl}/countries`)
  .then((response) => response.json())
  .then((responseJson) => {
    const { countries } = responseJson;
    const data = [];
    countries.forEach((country) => {
      data.push(country.name);
    });
    return Promise.resolve(data);
  })
  .catch((error) => Promise.reject(error));

export default getCountries;
