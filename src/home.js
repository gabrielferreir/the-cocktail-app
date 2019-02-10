import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    Animated,
    Easing
} from 'react-native';
import {Container, Header, Title, Button, Left, Right, Body, Icon} from 'native-base';
import {Content, Form, Item, Input, Label, Switch} from 'native-base';
import Service from './service';

export default class Home extends Component<Props> {

    service = new Service();

    static navigationOptions = {
        title: 'Home',
    };

    constructor() {
        super();
        this.state = {
            drinks: [],
            showFilter: false,
            search: '',
            searchByIngredients: false,
            researched: false,
            filterAlcoholic: false
        };

        this.animatedValue = new Animated.Value(0);

        this.get();
    }

    async get() {
        for (let i = 0; i < 8; i++) {
            const item = await this.service.getRandomDrink();
            this.setState({
                drinks: [
                    ...this.state.drinks,
                    item]
            });
        }
    }

    toogleFilter = () => {
        const {showFilter} = this.state;
        this.setState({showFilter: !showFilter});
        Animated.timing(
            this.animatedValue, {
                toValue: showFilter ? 120 : 0,
                duration: 300,
                easing: Easing.bounce
            }
        ).start();
    };

    search = async () => {
        let result = [];
        if (!this.state.searchByIngredients) {
            result = await this.service.search(this.state.search);
            console.warn(result);
        } else {
            result = await this.service.filter(this.state.search, 'i')
        }
        this.setState({
            drinks: result,
            researched: true
        });
    };

    filter = async (category) => {

        const result = await this.service.filter(category, 'c');
        this.setState({
            drinks: result,
            researched: true
        });
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
                            <Input placeholder="Search"
                                   onChangeText={(search) => this.setState({search})}
                                   onSubmitEditing={this.search}/>

                            <Right>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={this.search}>
                                        <Icon name='search' style={{marginRight: 16}}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.toogleFilter}>
                                        <Icon type='MaterialIcons' name='filter-list' style={{marginRight: 16}}/>
                                    </TouchableOpacity>
                                </View>
                            </Right>
                        </Item>
                    </Form>

                    <Animated.View style={{
                        height: this.animatedValue, overflow: 'hidden'
                    }}>
                        <View
                            style={{display: 'flex', flexDirection: 'row', paddingHorizontal: 32, paddingVertical: 16}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 14, color: 'rgba(0,0,0,.87)'}}>Search by</Text>
                                    <Text>{this.state.searchByIngredients ? 'Ingredient' : 'Name'}</Text>
                                </View>
                                <Switch onValueChange={value => this.setState({
                                    searchByIngredients: value
                                })} value={this.state.searchByIngredients}/>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                {/*<View style={{flex: 1}}>*/}
                                {/*<Text style={{fontSize: 14, color: 'rgba(0,0,0,.87)'}}>Alcoholic</Text>*/}
                                {/*<Text>Yes</Text>*/}
                                {/*</View>*/}
                                {/*<Switch onValueChange={} value={false}/>*/}
                            </View>
                        </View>

                        <View style={{
                            height: 48,
                            alignItems: 'center'
                        }}>
                            <ScrollView
                                alwaysBounceVertical={true}
                                scrollEventThrottle={16}
                                horizontal={true}>
                                <FlatList
                                    horizontal={true}
                                    data={this.categories}
                                    renderItem={({item}) =>
                                        <TouchableOpacity onPress={() => {
                                            this.filter(item.name);
                                        }}>
                                            <View style={{
                                                paddingHorizontal: 16,
                                                borderRadius: 12,
                                                marginHorizontal: 8,
                                                backgroundColor: '#CDCDCD',
                                                height: 28,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Text style={{
                                                    fontSize: 14,
                                                    color: '#000',
                                                    textAlign: 'center'
                                                }}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                />
                            </ScrollView>
                        </View>

                    </Animated.View>

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
                                    <TouchableOpacity onPress={() => {
                                        this.filter(item.name);
                                    }}>
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
                                    </TouchableOpacity>
                                }
                            />
                        </ScrollView>
                    </View>

                    <View style={{height: 48, justifyContent: 'center', padding: 16}}>
                        <Text style={{
                            fontSize: 16,
                            color: 'rgba(0,0,0,.62)'
                        }}>{this.state.researched ? 'Pesquisando por: ' + this.state.search : 'Nossas sugestões'}</Text>
                    </View>

                    <View style={{paddingVertical: 16}}>

                        <FlatList
                            data={this.state.drinks}
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
                                                borderRadius: 64,
                                                overflow: 'hidden'
                                            }}>

                                                <Image
                                                    source={{uri: item.image}}
                                                    style={{height: 64}}/>
                                                <Text>P</Text>

                                            </View>

                                            <View style={{
                                                height: 64,
                                                flex: 1,
                                                justifyContent: 'center',
                                                paddingLeft: 16
                                            }}>

                                                <Text>{item.name}</Text>
                                                <Text>{item.category}</Text>

                                            </View>

                                        </View>

                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {
                                            itemId: item.id
                                        })}>
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