

/*import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const TICKET_PRICE = 150;
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    const existing = JSON.parse(localStorage.getItem('bookings')) || {};
    const key = `${id}_${selectedDate}_${selectedTime}`;
    setBookedSeats(existing[key] || []);
  }, [id, selectedDate, selectedTime]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBooking = () => {
    if (!movie) {
      alert('Movie data is still loading. Please wait.');
      return;
    }

    if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
      alert('Please select date, time, and at least one seat.');
      return;
    }

    // Simulated UPI deep link
    const upiLink = `upi://pay?pa=dummy@upi&pn=SanimaMovies&am=${selectedSeats.length * TICKET_PRICE}&cu=INR`;
    window.open(upiLink, '_blank');

    // Simulate booking confirmation after delay
    setTimeout(() => {
      const key = `${id}_${selectedDate}_${selectedTime}`;
      const existing = JSON.parse(localStorage.getItem('bookings')) || {};
      const updatedSeats = [...(existing[key] || []), ...selectedSeats];
      existing[key] = [...new Set(updatedSeats)];
      localStorage.setItem('bookings', JSON.stringify(existing));

      const total = selectedSeats.length * TICKET_PRICE;

      navigate('/receipt', {
        state: {
          movie,
          selectedDate,
          selectedTime,
          selectedSeats,
          total,
        },
      });
    }, 5000);
  };

  if (!movie) return <div style={{ padding: 20 }}>Loading movie details...</div>;

  return (
    <div style={{ padding: 20, maxWidth: '900px', margin: '0 auto' }}>
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '300px',
          borderRadius: '10px',
          marginBottom: '20px',
        }}
      ></div>

      <h2 style={{ textAlign: 'center' }}>🎟️ Book Tickets for <em>{movie.title}</em></h2>

      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <h4>Select Date:</h4>
        <input
          type="date"
          value={selectedDate}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSeats([]);
          }}
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h4>Select Time:</h4>
        {['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'].map((time) => (
          <button
            key={time}
            onClick={() => {
              setSelectedTime(time);
              setSelectedSeats([]);
            }}
            style={{
              margin: '5px',
              backgroundColor: selectedTime === time ? '#007bff' : '#eee',
              color: selectedTime === time ? '#fff' : '#000',
              padding: '10px 15px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            {time}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <span style={{ marginRight: 10 }}>
          <span style={{
            display: 'inline-block',
            width: 15,
            height: 15,
            backgroundColor: '#ccc',
            marginRight: 5,
            borderRadius: 3,
          }}></span> Available
        </span>
        <span style={{ marginRight: 10 }}>
          <span style={{
            display: 'inline-block',
            width: 15,
            height: 15,
            backgroundColor: '#28a745',
            marginRight: 5,
            borderRadius: 3,
          }}></span> Selected
        </span>
        <span>
          <span style={{
            display: 'inline-block',
            width: 15,
            height: 15,
            backgroundColor: 'gray',
            marginRight: 5,
            borderRadius: 3,
          }}></span> Booked
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px', marginBottom: '30px' }}>
        {Array.from({ length: 50 }, (_, i) => {
          const seatNumber = i + 1;
          const isSelected = selectedSeats.includes(seatNumber);
          const isBooked = bookedSeats.includes(seatNumber);

          return (
            <div
              key={seatNumber}
              onClick={() => toggleSeat(seatNumber)}
              style={{
                height: '40px',
                backgroundColor: isBooked
                  ? 'gray'
                  : isSelected
                  ? '#28a745'
                  : '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isBooked ? 'not-allowed' : 'pointer',
                borderRadius: '5px',
                color: '#000',
                opacity: isBooked ? 0.5 : 1,
                userSelect: 'none',
              }}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>

      {selectedSeats.length > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '18px' }}>
          <strong>🎫 Total: ₹{selectedSeats.length * TICKET_PRICE}</strong>
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleBooking}
          style={{
            padding: '14px 30px',
            backgroundColor: '#28a745',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          🏦 Pay & Confirm
        </button>
      </div>
    </div>
  );
};

export default BookMovie;*/

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const TICKET_PRICE = 150;
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    const existing = JSON.parse(localStorage.getItem('bookings')) || {};
    const key = `${id}_${selectedDate}_${selectedTime}`;
    setBookedSeats(existing[key] || []);
  }, [id, selectedDate, selectedTime, API_KEY]); // ✅ Fixed warning by including API_KEY

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBooking = () => {
    if (!movie) {
      alert('Movie data is still loading. Please wait.');
      return;
    }

    if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
      alert('Please select date, time, and at least one seat.');
      return;
    }

    const upiLink = `upi://pay?pa=dummy@upi&pn=SanimaMovies&am=${selectedSeats.length * TICKET_PRICE}&cu=INR`;
    window.open(upiLink, '_blank');

    setTimeout(() => {
      const key = `${id}_${selectedDate}_${selectedTime}`;
      const existing = JSON.parse(localStorage.getItem('bookings')) || {};
      const updatedSeats = [...(existing[key] || []), ...selectedSeats];
      existing[key] = [...new Set(updatedSeats)];
      localStorage.setItem('bookings', JSON.stringify(existing));

      const total = selectedSeats.length * TICKET_PRICE;

      navigate('/receipt', {
        state: {
          movie,
          selectedDate,
          selectedTime,
          selectedSeats,
          total,
        },
      });
    }, 5000);
  };

  if (!movie) return <div style={{ padding: 20 }}>Loading movie details...</div>;

  return (
    <div style={{ padding: 20, maxWidth: '900px', margin: '0 auto' }}>
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '300px',
          borderRadius: '10px',
          marginBottom: '20px',
        }}
      ></div>

      <h2 style={{ textAlign: 'center' }}>
        🎟️ Book Tickets for <em>{movie.title}</em>
      </h2>

      {/* Date Picker */}
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <h4>Select Date:</h4>
        <input
          type="date"
          value={selectedDate}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedSeats([]);
          }}
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* Time Picker */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h4>Select Time:</h4>
        {['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'].map((time) => (
          <button
            key={time}
            onClick={() => {
              setSelectedTime(time);
              setSelectedSeats([]);
            }}
            style={{
              margin: '5px',
              backgroundColor: selectedTime === time ? '#007bff' : '#eee',
              color: selectedTime === time ? '#fff' : '#000',
              padding: '10px 15px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            {time}
          </button>
        ))}
      </div>

      {/* Seat Legend */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <span style={{ marginRight: 10 }}>
          <span style={{
            display: 'inline-block',
            width: 15,
            height: 15,
            backgroundColor: '#ccc',
            marginRight: 5,
            borderRadius: 3,
          }}></span> Available
        </span>
        <span style={{ marginRight: 10 }}>
          <span style={{
            display: 'inline-block',
            width: 15,
            height: 15,
            backgroundColor: '#28a745',
            marginRight: 5,
            borderRadius: 3,
          }}></span> Selected
        </span>
        <span>
          <span style={{
            display: 'inline-block',
            width: 15,
            height: 15,
            backgroundColor: 'gray',
            marginRight: 5,
            borderRadius: 3,
          }}></span> Booked
        </span>
      </div>

      {/* Seat Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gap: '10px',
        marginBottom: '30px'
      }}>
        {Array.from({ length: 50 }, (_, i) => {
          const seatNumber = i + 1;
          const isSelected = selectedSeats.includes(seatNumber);
          const isBooked = bookedSeats.includes(seatNumber);

          return (
            <div
              key={seatNumber}
              onClick={() => toggleSeat(seatNumber)}
              style={{
                height: '40px',
                backgroundColor: isBooked
                  ? 'gray'
                  : isSelected
                  ? '#28a745'
                  : '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isBooked ? 'not-allowed' : 'pointer',
                borderRadius: '5px',
                color: '#000',
                opacity: isBooked ? 0.5 : 1,
                userSelect: 'none',
              }}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>

      {/* Total Price */}
      {selectedSeats.length > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '18px' }}>
          <strong>🎫 Total: ₹{selectedSeats.length * TICKET_PRICE}</strong>
        </div>
      )}

      {/* Confirm Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleBooking}
          style={{
            padding: '14px 30px',
            backgroundColor: '#28a745',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          🏦 Pay & Confirm
        </button>
      </div>
    </div>
  );
};

export default BookMovie;






