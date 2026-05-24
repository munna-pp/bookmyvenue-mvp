import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/bookings"
      );

      setBookings(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>My Bookings</h1>

      {bookings.map((booking) => (

        <div
          key={booking.id}
          style={{
            border: "1px solid lightgray",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >

          <h2>{booking.name}</h2>

          <p>📍 {booking.location}</p>

          <p>💰 ₹ {booking.price}</p>

          <p>📅 {booking.booking_date}</p>

        </div>

      ))}

    </div>

  );

}

export default MyBookings;