import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Title, Text } from "react-native-paper";
import Carousel from 'react-native-snap-carousel'
import { IMAGE_HOST} from '.././utils/constants'
import { getGenreMoviesApi } from '../Api/movies'
import { map, size } from "lodash";


const { width } = Dimensions.get('window')
const ITEM_WIDTH = Math.round(width * 0.7) ;

export default function CarruselVertical(props) {

    const { data, navigation } = props;

    return (
        <Carousel 
            layout = {'default'}
            data = {data}
            renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
            sliderWidth = {width}
            itemWidth = {ITEM_WIDTH}
        />
    );
}

function RenderItem(props) {
    const { data, navigation } = props;
    const { title, poster_path, genre_ids, id } = data.item;
    const imageUrl = `${IMAGE_HOST}/w500${poster_path}`
    const [genres, setGenres] = useState(null)

    const getGenreMovies = async () => {
        const res = await getGenreMoviesApi(genre_ids);
        setGenres(res);    
      }

    useEffect(() => {
        getGenreMovies();
    }, [])

    const onNavigation = () => {
        navigation.navigate('Movie', {id: id})
    }

    return (
        <TouchableWithoutFeedback onPress={onNavigation} >
            <View style={styles.card}>
                <Image style={styles.image} source={{uri: imageUrl}} />
                <Title style={styles.title}>{title}</Title>
                <View style={styles.genres}>
                    {genres && (
                        map(genres, (genre, index) => (
                            <Text key={index} style={styles.genre}>
                                {genre}
                                {index !== size(genres) -1 ? ', ': '.'}
                            </Text>
                        ) )
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card:{
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:10
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    image:{
        width:'100%',
        height:320,
        borderRadius:20
    },
    title:{
        marginHorizontal:10,
        marginTop:10,
        fontSize:12
    },
    genres:{
        flexDirection:'row',
        marginHorizontal:10
    },
    genre:{
        fontSize:10,
        color:'#8997a5'
    }
});
