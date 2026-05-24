import { useEffect, useState } from "react";

import axios from "axios";


function Bookings() {

  const [bookings, setBookings] = useState([]);


  useEffect(() => {

    fetchBookings();

  }, []);


  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/bookings"
      );

      setBookings(response.data.bookings);

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div style={{ padding: "30px" }}>

      <h1>My Bookings</h1>

      {

        bookings.map((booking) => (

          <div
            key={booking.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "10px",
            }}
          >

            <h3>Booking ID: {booking.id}</h3>

            <p>User ID: {booking.user_id}</p>

            <p>Venue ID: {booking.venue_id}</p>

            <p>Date: {booking.booking_date}</p>

          </div>

        ))

      }

    </div>

  );

}

export default Bookings;