import axios from "axios";
import PropTypes from 'prop-types';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36214966-0d101d8d6f502ad642532aad3';
export const PER_PAGE = 12;

const params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: PER_PAGE,
}

export const fetchData = async (strQuery, page) => { 
  const query = `${URL}?q=${strQuery}&page=${page}`;
  const responce = await axios.get(query, {params});

  return responce.data;
}

fetchData.propTypes = {
  strQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};