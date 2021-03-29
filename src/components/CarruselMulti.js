import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Title, Text } from "react-native-paper";
import Carousel from 'react-native-snap-carousel'
import {  IMAGE_HOST } from "../utils/constants";

const { width } = Dimensions.get('window')
const ITEM_WITH = Math.round(width * 0.3);

export default function CarruselMulti(props) {

    const { data, navigation } = props;
    return (
        <Carousel
            layout={'default'}
            data={data}
            renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
            sliderWidth={width}
            itemWidth = {ITEM_WITH}
            firstItem={1}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
        />
    );
}

function RenderItem(props) {

    const { data, navigation } = props;
    const { id, title, poster_path } = data.item
    const imageUrl = `${IMAGE_HOST}/w500${poster_path}`

    function onNavigation() {
        navigation.navigate('Movie', {id})
    }

    return(
        <TouchableWithoutFeedback onPress={onNavigation}>
            <View style={styles.card}>
                <Image style={styles.image} source={{uri: imageUrl}} />
                <Title  style={styles.title} numberOfLines={1}>{title}</Title>
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
        shadowOpacity:1,
        shadowRadius:10
    },
    image:{
        width:'85%',
        height:170    ,
        borderRadius:20
    },
    title:{
        marginHorizontal:10,
        marginTop:10,
        fontSize:10
    }
});
