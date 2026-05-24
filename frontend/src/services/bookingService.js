import axios from "axios";

const API = "http://localhost:5000/api/bookings";

export const createBooking = async (bookingData) => {

  const response = await axios.post(API, bookingData);

  return response.data;

};