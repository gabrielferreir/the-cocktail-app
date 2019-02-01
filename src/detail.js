import React, {Component} from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    // Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import {Text, Icon, Card} from 'native-base';


const HEADER_EXPANDED_HEIGHT = 320;
const HEADER_COLLAPSED_HEIGHT = 60;

const SCREEN_WIDTH = Dimensions.get("screen").width;

export default class Detail extends Component {
    constructor() {
        super();

        this.state = {
            scrollY: new Animated.Value(0)
        }
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
                        source={{uri: "https://www.thecocktaildb.com/images/media/drink/qtvvyq1439905913.jpg"}}
                        style={styles.backgroundImage}/>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.icon}>
                        <Icon type='MaterialIcons'
                              name='arrow-back' style={{color: '#FFF', marginRight: 16}}/>
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

                    <View>
                        <Text style={styles.title}>{'Margarita'}</Text>
                        <Text style={styles.subtitle}>{'Alcoholic'}</Text>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>

                        <Text style={styles.subheader}>
                            INGREDIENTES
                        </Text>

                    </View>

                    <Text style={styles.ingredients}>Tequila</Text>
                    <Text style={styles.ingredients}>Triple sec</Text>
                    <Text style={styles.ingredients}>Salt</Text>

                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>

                        <Text style={styles.subheader}>PREPARO</Text>

                    </View>
                    {/*<View style={{width: 80, height: 80, backgroundColor: '#F00'}}></View>*/}

                    <Text style={styles.preparation}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel ultrices ante. Duis
                        vulputate
                        lorem non tortor pharetra, aliquet aliquet leo efficitur. Ut sed rutrum nisi. Pellentesque
                        facilisis erat sit amet mi ornare, et dapibus tortor congue. Integer vulputate magna a
                        vehicula
                        accumsan. Cras nec nunc consequat, volutpat felis vitae, pulvinar nibh. Vestibulum lacinia
                        in
                        tortor vel maximus. Suspendisse semper dolor ligula. Praesent pellentesque suscipit enim, at
                        dictum nisl pellentesque non. Phasellus nec consectetur magna. Interdum et malesuada fames
                        ac
                        ante ipsum primis in faucibus. Sed condimentum porttitor elit ut dignissim. Nunc nec libero
                        a
                        orci porttitor accumsan eget sed diam. Cras dignissim, nulla sed laoreet accumsan, mi quam
                        egestas mauris, id posuere purus lorem sagittis purus. Duis sollicitudin neque ac aliquet
                        sollicitudin.
                        In eros est, sollicitudin sit amet risus eget, porttitor pulvinar ipsum. Nulla eget quam
                        arcu.
                        Mauris vel odio cursus, hendrerit augue et, ultricies massa. Phasellus pharetra et libero id
                        semper. Sed sollicitudin commodo mi, nec efficitur sem congue vitae. Ut pellentesque augue
                        ut
                        lacus finibus sollicitudin. Donec a auctor augue. Orci varius natoque penatibus et magnis
                        dis
                        parturient montes, nascetur ridiculus mus. Nullam vitae convallis nulla. Maecenas venenatis
                        lorem at mi commodo pharetra. Mauris finibus hendrerit magna, sit amet ultrices turpis
                        aliquet
                        nec. Proin et diam suscipit, sollicitudin risus ac, porta nibh.
                    </Text>

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
    title: {
        marginTop: 16,
        color: 'rgba(0,0,0,.87)',
        // fontWeight: "bold",
        fontSize: 24,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(0,0,0,.62)',
    },
    subheader: {
        paddingVertical: 18,
        fontSize: 16,
        color: 'rgba(0,0,0,.87)',
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
        left: 16
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
        paddingLeft: 16
    }
});