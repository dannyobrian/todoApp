import fetch from 'isomorphic-fetch';

export const GET_LOCALE = 'GET_LOCALE';
export const SET_LOCALE = 'SET_LOCALE';

export function setGlobalLocale(data) {
  return {type: SET_LOCALE, locale: data.locale, countryName: data.countryName}
}

export function getGlobalLocale() {
  return (dispatch) => {
    let url = "https://ssl.geoplugin.net/json.gp?k=1GHn5z5EEzeFix25";
    return fetch(url)
      .then(res => res.json())
      .then((res) => {
        let result = {locale: res.geoplugin_countryCode, countryName: res.geoplugin_countryName};
        dispatch(setGlobalLocale(result));
        return Promise.resolve(result);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
}