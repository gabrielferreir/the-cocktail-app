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
import {Container, Right, Body, Icon} from 'native-base';
import {Form, Item, Input, Switch} from 'native-base';
import Service from './service';

export default class Home extends Component<Props> {

    service = new Service();
    suggestions = [];

    static navigationOptions = {
        title: 'Home',
    };

    constructor() {
        super();
        this.state = {
            drinks: [],
            glasses: [],
            categories: [
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
            ],
            alcoholic: [],
            showFilter: false,
            search: '',
            searchByIngredients: false,
            typeSearch: null
        };

        this.animatedValue = new Animated.Value(0);

        this.get();
        this.getGlasses();
        this.getAlcoholic();
    }

    async get() {
        for (let i = 0; i < 8; i++) {
            const item = await this.service.getRandomDrink();
            this.suggestions.push(item);
            this.setState({
                drinks: [
                    ...this.state.drinks,
                    item]
            });
        }
    }

    async getGlasses() {
        const glasses = await this.service.getGlasses();
        this.setState({
            glasses: glasses
        });
    }

    async getAlcoholic() {
        const alcoholic = await this.service.getAlcoholic();
        this.setState({
            alcoholic: alcoholic
        });
    }

    toogleFilter = () => {
        const {showFilter} = this.state;
        this.setState({showFilter: !showFilter});
        Animated.timing(
            this.animatedValue, {
                toValue: showFilter ? 260 : 0,
                duration: 300,
                easing: Easing.bounce
            }
        ).start();
    };

    search = async () => {
        let result = [];
        if (!this.state.searchByIngredients) {
            result = await this.service.search(this.state.search);
            this.setState({typeSearch: 's'});
        } else {
            this.setState({typeSearch: 'i'});
            result = await this.service.filter(this.state.search, 'i')
        }
        this.setState({drinks: result});
    };

    filterCategories = async (item, index) => {
        this.clearFilters();

        const newCategories = this.clearCategories();
        newCategories.splice(index, 1, {...item, checked: true});

        this.setState({
            typeSearch: 'c',
            categories: newCategories
        });
        const result = await this.service.filter(item.name, 'c');
        this.setState({
            drinks: result
        });

    };

    filterGlass = async (item, index) => {
        this.clearFilters();

        const newGlasses = this.clearGlasses();
        newGlasses.splice(index, 1, {...item, checked: true});

        this.setState({
            typeSearch: 'g',
            glasses: newGlasses
        });

        const result = await this.service.filter(item.name, 'g');
        this.setState({
            drinks: result
        });
    };

    filterAlcoholic = async (item, index) => {
        this.clearAlcoholic();

        const newAlcoholic = this.clearAlcoholic();
        newAlcoholic.splice(index, 1, {...item, checked: true});

        this.setState({
            typeSearch: 'a',
            alcoholic: newAlcoholic
        });

        const result = await this.service.filter(item.name, 'a');
        this.setState({
            drinks: result
        });
    };

    clearCategories() {
        return JSON.parse(JSON.stringify(this.state.categories))
            .map(item => ({...item, checked: false}));
    };

    clearGlasses() {
        return JSON.parse(JSON.stringify(this.state.glasses))
            .map(item => ({...item, checked: false}));
    };

    clearAlcoholic() {
        return JSON.parse(JSON.stringify(this.state.alcoholic))
            .map(item => ({...item, checked: false}));
    };

    clearFilters = () => {
        this.setState({
            showFilter: false,
            search: '',
            searchByIngredients: false,
            typeSearch: null,
            categories: this.clearCategories(),
            glasses: this.clearGlasses(),
            alcoholic: this.clearAlcoholic(),
            drinks: this.suggestions
        });
    };

    colorCategory = (typeSearch, checked) => {
        if (typeSearch === 'c') {
            return checked;
        } else {
            return true;
        }
    };

    colorGlasses = (typeSearch, checked) => {
        if (typeSearch === 'g') {
            return checked;
        } else {
            return true;
        }
    };

    colorAlcoholic = (typeSearch, checked) => {
        if (typeSearch === 'a') {
            return checked;
        } else {
            return true;
        }
    };

    message(typeSearch) {
        switch (typeSearch) {
            case 'c':
                return 'Searching by: Category';
            case 'g':
                return 'Searching by: Glass';
            case 'a':
                return 'Searching by: Alcohol content';
            case 'i':
                return 'Searching by: Ingredient';
            case 's':
                return 'Searching by: Name';
            default:
                return 'Our Suggestions';
        }
    };

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
                            style={{display: 'flex', flexDirection: 'row', paddingHorizontal: 16, paddingTop: 16}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 14, color: 'rgba(0,0,0,.87)'}}>Search by</Text>
                                    <Text>{this.state.searchByIngredients ? 'Ingredient' : 'Name'}</Text>
                                </View>
                                <Switch onValueChange={value => this.setState({
                                    searchByIngredients: value
                                })} value={this.state.searchByIngredients}/>
                            </View>
                            <View style={{flex: 1}}></View>
                        </View>

                        <View
                            style={{display: 'flex', flexDirection: 'row', paddingLeft: 16, paddingVertical: 16}}>
                            <Text style={{fontSize: 14, color: 'rgba(0,0,0,.87)'}}>Glass</Text>
                        </View>

                        <View style={{
                            height: 48,
                            alignItems: 'center',
                            paddingLeft: 16,
                        }}>
                            <ScrollView
                                alwaysBounceVertical={true}
                                scrollEventThrottle={16}
                                horizontal={true}>
                                <FlatList
                                    horizontal={true}
                                    data={this.state.glasses}
                                    renderItem={({item, index}) =>
                                        <View style={{paddingVertical: 8, position: 'relative'}}>
                                            <TouchableOpacity onPress={() => {
                                                this.filterGlass(item, index);
                                            }}>
                                                <View style={{
                                                    paddingHorizontal: 16,
                                                    borderRadius: 12,
                                                    marginHorizontal: 4,
                                                    backgroundColor: this.colorGlasses(this.state.typeSearch, item.checked) ? '#eeeeee' : '#fafafa',
                                                    height: 28,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Text style={{
                                                        fontSize: 14,
                                                        color: this.colorGlasses(this.state.typeSearch, item.checked) ? 'rgba(0,0,0,.87)' : '#rgba(0,0,0,.61)',
                                                        textAlign: 'center'
                                                    }}>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            {item.checked && <View style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                zIndex: 8,
                                                backgroundColor: '#f44336',
                                                borderRadius: 16
                                            }}>
                                                <TouchableOpacity onPress={this.clearFilters}>
                                                    <Icon type='MaterialIcons' name='clear'
                                                          style={{color: '#FFF', fontSize: 18}}/>
                                                </TouchableOpacity>
                                            </View>}
                                        </View>
                                    }
                                />
                            </ScrollView>
                        </View>

                        <View
                            style={{display: 'flex', flexDirection: 'row', paddingLeft: 16, paddingVertical: 16}}>
                            <Text style={{fontSize: 14, color: 'rgba(0,0,0,.87)'}}>Type</Text>
                        </View>

                        <View
                            style={{display: 'flex', flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 16}}>

                            <ScrollView
                                alwaysBounceVertical={true}
                                scrollEventThrottle={16}
                                horizontal={true}>
                                <FlatList
                                    horizontal={true}
                                    data={this.state.alcoholic}
                                    renderItem={({item, index}) =>
                                        <View style={{paddingVertical: 8, position: 'relative'}}>
                                            <TouchableOpacity onPress={() => {
                                                this.filterAlcoholic(item, index)
                                            }}>
                                                <View style={{
                                                    paddingHorizontal: 16,
                                                    borderRadius: 12,
                                                    marginHorizontal: 4,
                                                    backgroundColor: this.colorAlcoholic(this.state.typeSearch, item.checked) ? '#eeeeee' : '#fafafa',
                                                    height: 28,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Text style={{
                                                        fontSize: 14,
                                                        color: this.colorAlcoholic(this.state.typeSearch, item.checked) ? 'rgba(0,0,0,.87)' : '#rgba(0,0,0,.61)',
                                                        textAlign: 'center'
                                                    }}>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            {item.checked && <View style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                zIndex: 8,
                                                backgroundColor: '#f44336',
                                                borderRadius: 16
                                            }}>
                                                <TouchableOpacity onPress={this.clearFilters}>
                                                    <Icon type='MaterialIcons' name='clear'
                                                          style={{color: '#FFF', fontSize: 18}}/>
                                                </TouchableOpacity>
                                            </View>}
                                        </View>
                                    }/>
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
                                data={this.state.categories}
                                extraData={this.state.typeSearch}
                                renderItem={({item, index}) =>
                                    <TouchableOpacity onPress={() => {
                                        this.filterCategories(item, index);
                                    }}>
                                        <View style={{
                                            height: 96,
                                            width: 96,
                                            padding: 8,
                                            position: 'relative',
                                        }}>

                                            <View style={{
                                                flex: 1,
                                                backgroundColor: this.colorCategory(this.state.typeSearch, item.checked) ? item.color : '#CDCDCD',
                                                padding: 8,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 2,
                                                position: 'relative',
                                                overflow: 'visible'
                                            }}>

                                                <Icon type='MaterialIcons' name='local-bar' style={{color: '#FFF'}}/>
                                                <Text style={{
                                                    fontSize: 10,
                                                    color: '#FFF',
                                                    textAlign: 'center'
                                                }}>{item.name}</Text>

                                            </View>

                                            {item.checked && <View style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                zIndex: 8,
                                                backgroundColor: '#FFF',
                                                borderRadius: 16
                                            }}>
                                                <TouchableOpacity onPress={this.clearFilters}>
                                                    <Icon type='MaterialIcons' name='clear'
                                                          style={{color: '#000', fontSize: 18}}/>
                                                </TouchableOpacity>
                                            </View>}

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
                        }}>{this.message(this.state.typeSearch)}</Text>
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