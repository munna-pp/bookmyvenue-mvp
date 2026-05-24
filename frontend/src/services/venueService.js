import axios from "axios";

const API = "http://localhost:5000/api/venues";

export const getVenues = async () => {
  const response = await axios.get(API);
  return response.data;
};