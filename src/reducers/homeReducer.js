import SET_LOCALE from '../components/Global/globalActions'

const home = (state, action) => {

  // define default state
  if (!state) {
    state = {
      language: 'en',
      locale: '',
      countryName: '',
    }
  }

  switch (action.type) {

    case ADD_TODO:
      return Object.assign({}, state, { [action.id]: action.data});
      break;

    default:
      return state;
  }
};

export default home;