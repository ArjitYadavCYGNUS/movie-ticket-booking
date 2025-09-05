

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const MovieSlider = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(`${title} API response:`, data);
        setMovies(Array.isArray(data.results) ? data.results : []);
      })
      .catch((err) => console.error(`Error fetching ${title}:`, err));
  }, [fetchUrl, title]);

  return (
    <div style={{ marginBottom: '40px' }}>
      <h3 style={{ margin: '10px 0' }}>{title}</h3>
      <Slider {...sliderSettings}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ padding: '5px' }}>
            <div
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() => navigate(`/show/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                  borderRadius: '10px',
                }}
              />
              <h5 style={{ margin: '10px 0 5px', fontSize: '16px' }}>{movie.title}</h5>
              <p style={{ margin: 0, fontSize: '14px', color: '#fcfcfcff' }}>
                ⭐ {movie.vote_average?.toFixed(1)} / 10
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const Home = () => {
  return (
    <div style={{ padding: '10px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>🏠 Welcome to Cineplix</h2>

      <MovieSlider
        title="🔥 Trending Now"
        fetchUrl={`${TMDB_BASE_URL}/trending/movie/day?api_key=${API_KEY}`}
      />
      <MovieSlider
        title="🎬 Hollywood Movies"
        fetchUrl={`${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en`}
      />
      <MovieSlider
        title="🎥 Bollywood Movies"
        fetchUrl={`${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi`}
      />
      <MovieSlider
        title="⭐ Top Rated"
        fetchUrl={`${TMDB_BASE_URL}/movie/top_rated?api_key=${API_KEY}`}
      />
      <MovieSlider
        title="🆕 Upcoming Releases"
        fetchUrl={`${TMDB_BASE_URL}/movie/upcoming?api_key=${API_KEY}`}
      />
    </div>
  );
};

export default Home;






