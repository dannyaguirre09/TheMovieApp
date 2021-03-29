import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { getNewsMoviesApi, getAllGenresApi, getGenresMoviesApi } from "../Api/movies";
import { Title, Text } from "react-native-paper";
import CarruselVertical from "../components/CarruselVertical";
import CarruselMulti from "../components/CarruselMulti";
import { map } from "lodash";


export default function Home(props) {

  const {navigation} = props
  const [newMovies, setNewMovies] = useState(null);
  const [genreList, setGenreList] = useState(null);
  const [genreSelected, setGenreSelected] = useState(28);  
  const [genreMovies, setGenreMovies] = useState(null);  

  const getMovies = async () => {
    const res = await getNewsMoviesApi();
    setNewMovies(res.results);    
  }

  const getAllGenres = async () => {
    const res = await getAllGenresApi();
    setGenreList(res.genres);  
  }

  const getGenres = async () => {
    const res = await getGenresMoviesApi(genreSelected);    
    setGenreMovies(res.results);  
  }

  useEffect( () => {
    getMovies();

  }, []) ;

  useEffect( () => {
    getAllGenres();
  }, []) ;

  useEffect( () => {
    getGenres();
  }, [genreSelected]) ;

  const onChangeGenre = (newGenreId) => {
    setGenreSelected(newGenreId)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        {newMovies && (
          <View style={styles.news}>
            <Title style={styles.newsTitle}>Nuevas Películas</Title>  
            <CarruselVertical data={newMovies} navigation={navigation} />          
          </View>
        )}
        <View style={styles.genres} > 
          <Title style={styles.genresTitle} >Películas por género</Title>
          <ScrollView style={styles.genreList} horizontal={true} showsHorizontalScrollIndicator={false}>
            {map(genreList, (genre) => (
              <Text
                onPress={()=> onChangeGenre(genre.id)}
                style={[styles.genre, {color: genre.id != genreSelected ? '#8697a5': '#fff'}]} key={genre.id}>
                {genre.name}
              </Text>
            ) )}
          </ScrollView>
          {genreMovies && (
            <CarruselMulti data={genreMovies} navigation={navigation} />
          )}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news:{
    marginVertical:10,
  },
  newsTitle:{
    marginBottom:15,
    marginHorizontal:20,
    fontWeight:'bold',
    fontSize:15
  },
  genres:{
    marginTop:20,
    marginBottom:50
  },
  genresTitle:{
    marginHorizontal:20,
    fontSize: 15,
    fontWeight:'bold'
  },
  genreList:{
    marginTop: 5,
    marginBottom:15,    
    padding:10,
    paddingHorizontal: 20
  },
  genre:{
    marginRight:20,
    fontSize:14
  }
});
