import { API_HOST, API_KEY, LANG } from "../utils/constants";

export function getNewsMoviesApi(page = 1) {
   const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;
   return fetch(url).then((res) => {return res.json()} ).then((data) => {return data})
}

export function getGenreMoviesApi(idGenres) {
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
    return fetch(url).then((res) => {return res.json()} ).then((data) => {
        const arrayGenres = [];
        idGenres.forEach((id) => {
            data.genres.forEach((item) => {
                if(item.id === id) arrayGenres.push(item.name)
            });
        });
        return arrayGenres;
    })    
}

export function getAllGenresApi() {
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
    return fetch(url).then((res) => {return res.json()} ).then((data) => {return data})
}

export function getGenresMoviesApi(idGenre) {
    const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenre}&language=${LANG}`;
    return fetch(url).then((res) => {return res.json()} ).then((data) => {return data})
}