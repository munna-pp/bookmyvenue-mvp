import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getVenues } from "../services/venueService";

import { createBooking } from "../services/bookingService";


function Home() {

  const [venues, setVenues] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/");

    } else {

      fetchVenues();

    }

  }, []);


  const fetchVenues = async () => {

    try {

      const data = await getVenues();

      setVenues(data);

    } catch (error) {

      console.log(error);

    }

  };


  const handleBooking = async (venueId) => {

    try {

      const bookingData = {

        user_id: user?.id || 1,

        venue_id: venueId,

        booking_date: "2026-06-01"

      };

      const response = await createBooking(
        bookingData
      );

      alert(response.message);

    } catch (error) {

      console.log(error);

      alert("Booking Failed");

    }

  };


  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

  };


  return (

    <div style={{ padding: "30px" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >

        <div>

          <h1>BookMyVenue</h1>

          <p>
            Welcome {user?.name} 👋
          </p>

        </div>

        <button
          onClick={logout}
          style={{
            padding: "10px 20px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>

      </div>


      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >

        {venues.map((venue) => (

          <div
            key={venue.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >

            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
              alt="venue"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            />

            <h2>{venue.name}</h2>

            <p>📍 {venue.location}</p>

            <p>💰 ₹ {venue.price}</p>

            <p>👥 Capacity: {venue.capacity}</p>

            <button
              onClick={() =>
                handleBooking(venue.id)
              }
              style={{
                padding: "10px 20px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Book Now
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Home;