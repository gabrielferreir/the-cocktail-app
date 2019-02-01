import Home from './src/home';
import Detail from './src/detail';
import {createStackNavigator, createAppContainer} from 'react-navigation';


const MainNavigator = createStackNavigator({
        Home: {
            screen: Home,
            title: 'Home'
        },
        Detail: {
            screen: Detail,
            navigationOptions: {
                title: 'Home',
                headerStyle: {
                    headerMode: 'float',
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    headerTintColor: '#303f9f',
                    zIndex: 100,
                    top: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }
            },
        },
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            // transparentHeader: {
            //     position: 'absolute',
            //     backgroundColor: 'transparent',
            //     zIndex: 100,
            //     top: 0,
            //     left: 0,
            //     right: 0,
            //     headerMode: 'screen'
            // },
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#303f9f'
            },
        },
    });

const App = createAppContainer(MainNavigator);

export default App;