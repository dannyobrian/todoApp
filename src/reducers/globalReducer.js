import SET_LOCALE from '../components/Global/globalActions';

const global = (state, action) => {

  // define default state
  if (!state) {
    state = {
      language: 'en',
      locale: '',
      countryName: '',
    }
  }

  switch (action.type) {

    case SET_LOCALE:
      return Object.assign({}, state, { locale: action.locale, countryName: action.countryName});
      break;

    default:
      return state;
  }
};

export default global;