import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {Container, Header, Title, Button, Left, Right, Body, Icon} from 'native-base';
import {Content, Form, Item, Input, Label} from 'native-base';
import Repository from './repository';

export default class Home extends Component<Props> {

    static navigationOptions = {
        title: 'Home',
    };

    categories = [
        {
            name: "Ordinary Drink",
            color: '#d81b60'
        },
        {
            name: "Cocktail",
            color: '#8e24aa'
        },
        {
            name: "Milk / Float / Shake",
            color: '#5e35b1'
        },
        {
            name: "Other/Unknown",
            color: '#3949ab'
        },
        {
            name: "Cocoa",
            color: '#1e88e5'
        },
        {
            name: "Shot",
            color: '#039be5'
        },
        {
            name: "Coffee / Tea",
            color: '#00acc1'
        },
        {
            name: "Homemade Liqueur",
            color: '#00897b'
        },
        {
            name: "Punch / Party Drink",
            color: '#43a047'
        },
        {
            name: "Beer",
            color: '#7cb342'
        },
        {
            name: "Soft Drink / Soda",
            color: '#c0ca33'
        }
    ];


    render() {
        return (
            <Container>

                <ScrollView>

                    <Form>
                        <Item inlineLabel>
                            <Label>Pesquisar</Label>
                            <Input/>
                            <Right>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name='search' style={{marginRight: 16}}/>
                                    <Icon type='MaterialIcons' name='filter-list' style={{marginRight: 16}}/>
                                </View>
                            </Right>
                        </Item>
                    </Form>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: '#EEE',
                        minHeight: 112,
                        maxHeight: 112,
                        paddingTop: 16
                    }}>
                        <ScrollView
                            alwaysBounceVertical={true}
                            scrollEventThrottle={16}
                            horizontal={true}>
                            <FlatList
                                horizontal={true}
                                data={this.categories}
                                renderItem={({item}) =>
                                    <View style={{
                                        height: 80,
                                        width: 80,
                                        backgroundColor: item.color,
                                        marginRight: 8,
                                        marginLeft: 8,
                                        padding: 8,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 2
                                    }}>

                                        <Icon type='MaterialIcons' name='local-bar' style={{color: '#FFF'}}/>
                                        <Text style={{
                                            fontSize: 10,
                                            color: '#FFF',
                                            textAlign: 'center'
                                        }}>{item.name}</Text>

                                    </View>
                                }
                            />
                        </ScrollView>
                    </View>

                    <View style={{height: 48, justifyContent: 'center', padding: 16}}>
                        <Text style={{fontSize: 16, color: 'rgba(0,0,0,.62)'}}>Nossas sugestões</Text>
                    </View>

                    <View style={{paddingVertical: 16}}>

                        <FlatList
                            data={[{key: 'a'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'},]}
                            renderItem={({item}) =>
                                <View style={{
                                    height: 80,
                                    backgroundColor: '#FFF',
                                    borderRadius: 16,
                                    elevation: 4,
                                    padding: 8,
                                    marginBottom: 16,
                                    marginHorizontal: 16
                                }}>

                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>

                                        <View style={{flex: 1, flexDirection: 'row'}}>

                                            <View style={{
                                                height: 64,
                                                width: 64,
                                                backgroundColor: '#CDCDCD',
                                                borderRadius: 64
                                            }}>

                                            </View>

                                            <View style={{
                                                height: 64,
                                                flex: 1,
                                                justifyContent: 'center',
                                                paddingLeft: 16
                                            }}>

                                                <Text>Margarita</Text>
                                                <Text>Drink</Text>

                                            </View>

                                        </View>

                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail')}>
                                            <Icon type='MaterialIcons'
                                                  name='arrow-forward' style={{marginRight: 16}}/>
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            }>

                        </FlatList>

                    </View>

                </ScrollView>

            </Container>
        );
    }
}