import React, {Component} from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import {Text, Icon, Card} from 'native-base';
import Service from "./service";


const HEADER_EXPANDED_HEIGHT = 320;
const HEADER_COLLAPSED_HEIGHT = 60;

const SCREEN_WIDTH = Dimensions.get("screen").width;

export default class Detail extends Component {

    service = new Service();

    constructor() {
        super();

        this.state = {
            drink: {},
            scrollY: new Animated.Value(0)
        };
    }

    componentDidMount() {
        const id = this.props.navigation.getParam('itemId', null);
        this.get(id);
    }

    async get(id) {
        const item = await this.service.getDrinkById(id);
        this.setState({
            drink: item
        });
    }

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
        });

        return (
            <View style={styles.container}>

                <Animated.View style={[styles.header, {height: headerHeight}]}>
                    <Image
                        source={{uri: this.state.drink.image}}
                        style={styles.backgroundImage}/>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.icon}>
                        <Icon type='MaterialIcons'
                              name='arrow-back' style={{color: '#4a148c'}}/>
                    </TouchableOpacity>
                </Animated.View>

                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollY
                                }
                            }
                        }])
                    }
                    scrollEventThrottle={16}>

                    <View style={styles.wrapper}>

                        <View style={styles.border}></View>

                        <View>
                            <Text style={styles.subtitle}>Name</Text>
                            <Text style={styles.title}>{this.state.drink.name}</Text>
                        </View>

                    </View>

                    <View style={styles.wrapper}>

                        <View style={styles.border}></View>

                        <View>
                            <Text style={styles.subtitle}>
                                Ingredients
                            </Text>

                            <FlatList
                                data={this.state.drink.ingredients}
                                renderItem={({item}) =>
                                    <Text style={styles.ingredients}>{item.measure} - {item.name}</Text>
                                }>

                            </FlatList>

                        </View>
                    </View>

                    <View style={styles.wrapper}>

                        <View style={styles.border}></View>

                        <View>
                            <Text style={styles.subtitle}>
                                Preparation
                            </Text>


                            <Text style={styles.preparation}>{this.state.drink.instructions}</Text>

                        </View>
                    </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 16,
        paddingTop: HEADER_EXPANDED_HEIGHT,
        backgroundColor: '#FFF'
    },
    header: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        top: 0,
        left: 0,
        zIndex: 9,
        elevation: 8
    },
    border: {
        flex: 1,
        maxWidth: 4,
        minWidth: 4,
        backgroundColor: '#4a148c'
    },
    wrapper: {
        width: SCREEN_WIDTH - 32,
        elevation: 2,
        marginTop: 16,
        backgroundColor: '#FFF',
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        flex: 1,
        flexDirection: 'row'
    },
    title: {
        color: 'rgba(0,0,0,.87)',
        // fontWeight: "bold",
        fontSize: 22,
        marginBottom: 4,
        marginLeft: 16
    },
    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: 'rgba(0,0,0,.62)',
        marginLeft: 16
    },
    subheader: {
        paddingVertical: 8,
        marginLeft: 16,
        fontSize: 16,
        color: 'rgba(0,0,0,.62)',

        fontWeight: 'bold'
    },
    ingredients: {
        paddingVertical: 8,
        paddingLeft: 16,
        fontSize: 16,
        color: 'rgba(0,0,0,.87)',
    },
    backgroundImage: {
        height: 320
    },
    icon: {
        position: 'absolute',
        top: 16,
        left: 16,
        padding: 4,
        backgroundColor: '#FFF',
        borderRadius: 32
    },
    titleHeader: {
        position: 'absolute',
        top: 16,
        left: 64,
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    preparation: {
        fontSize: 14,
        color: 'rgba(0,0,0,.62)',
        paddingHorizontal: 16,
        paddingBottom: 16
    }
});
