import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, FlatList, Image, Dimensions, ImageBackground} from 'react-native';
import {Container, Header, Title, Button, Left, Right, Body, Icon} from 'native-base';

export default class Detail extends Component<Props> {

    static navigationOptions = {
        title: 'Detalhes',

    };

    fullWidth = Dimensions.get('window').width; //full width
    // height = Dimensions.get('window').height; //full height

    render() {
        return (
            <ImageBackground
                style={{
                    height: this.fullWidth,
                    width: this.fullWidth,
                }}
                source={{uri: 'https://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg'}}
            >
                <Button
                    onPress={() => {
                    }}
                    title="Just a button"
                />
            </ImageBackground>
        );
    }
}