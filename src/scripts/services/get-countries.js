const baseUrl = 'https://covid19.mathdro.id/api';
const getCountries = () => {
  return fetch(`${baseUrl}/countries`)
    .then((response) => response.json())
    .then((responseJson) => {
      const countries = responseJson.countries;
      const data = [];

      for (const i in countries) {
        data.push(countries[i].name);
      }
      return Promise.resolve(data);
    })
    .catch((error) => Promise.reject(error));
};

export default getCountries;
