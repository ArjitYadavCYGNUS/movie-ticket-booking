/*import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

const ShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error('Error fetching movie details:', err));
  }, [id]);

  if (!movie) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{movie.title}</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '300px', borderRadius: '10px' }}
        />
        <div style={{ maxWidth: '600px' }}>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)} / 10</p>
          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres.map((genre) => genre.name).join(', ')}
          </p>
          <button
            onClick={() => navigate(`/book/${movie.id}`)}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            🎟️ Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;*/

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const ShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error('Error fetching movie details:', err));
  }, [id]); // ✅ Removed API_KEY from dependency array

  if (!movie) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{movie.title}</h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{
            width: '100%',
            maxWidth: '300px',
            borderRadius: '10px',
            objectFit: 'cover',
          }}
        />

        <div style={{ maxWidth: '600px' }}>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)} / 10</p>
          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres?.map((genre) => genre.name).join(', ')}
          </p>

          <button
            onClick={() => navigate(`/book/${movie.id}`)}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            🎟️ Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
