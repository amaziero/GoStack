import api from '../services/api';

const formatValue = (value: number): string =>
  Intl.NumberFormat().format(value); // TODO

export default formatValue;
