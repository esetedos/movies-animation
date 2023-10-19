import { API_KEY, GENRES } from "./.gitignore/config";

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTlhNDI2MTViZmY0OWQxNDUzODNkNmY3NjJkZThiNCIsInN1YiI6IjY1MzE2ZTQ4NjkwNWZiMDBjOWYwNWE4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EXqXAJ28o-BV3gnDepJZVsK-lW5svuxcTHxI1DWk_DE'
    }
  };

export const getMovies = async () => {
    try{
        let response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        let json = await response.json();
        // console.log(json);
        const movies = json.results.map(
            ({
                id,
                original_title,
                poster_path,
                backdrop_path,
                vote_average,
                overview,
                release_date,
                genre_ids,
            }) => ({
                key: String(id),
                originalTitle: original_title,
                posterPath: `https://image.tmdb.org/t/p/w500${poster_path}`,
                backdropPath: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
                voteAverage: vote_average,
                description: overview,
                releaseDate: release_date,
                genres: genre_ids.map(id => GENRES[id])
            })
        )
        return movies
    } catch(error){
        console.log(error);
    }
}



