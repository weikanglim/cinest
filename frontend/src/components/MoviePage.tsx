import { Button, Chip, Loader } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import { Movie } from "./types";
import { useState } from "react";

const MoviePage = () => {
    const location = useLocation();
    const movie = location.state?.movie;
    const genre = location.state?.genre;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const fetchMovie = async () => {
        setLoading(true)

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/api/random_movie/' + genre)
            const data = await response.json()
            const m: Movie = {
                id: data.movie.imdbID,
                title: data.movie.Title,
                plot: data.movie.Plot,
                genre: data.movie.Genre,
                poster: data.movie.Poster,
                year: data.movie.Year,
                runtime: data.movie.Runtime,
                rating: data.movie.Ratings,
                cast: data.movie.Actors
            }
            setLoading(false);
            navigate('/movie/' + m!.id, { state: { movie: m } })
        }
        catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return (
            <Loader color="violet" />
        )
    }

    console.log(movie);
    return (
        // Add a back button to the page
        // Add a chip for each rating
        // place in the top left
        <div style={{ position: 'relative' }}>
            <div>
                <MovieCard poster={movie.poster} title={movie.title} plot={movie.plot} ratings={movie.rating} />
                <button onClick={fetchMovie} style={{ marginRight: '10px' }}>Roll again!</button>

                <button
                    onClick={() => navigate('/')}
                >
                    Different genre, please!
                </button>
            </div>
        </div>
    )
}




export default MoviePage;