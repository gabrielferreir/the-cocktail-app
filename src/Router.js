import Home from './pages/home';
import Detail from './pages/detail';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const AppNavigator = createStackNavigator({
        Home: {
            screen: Home,
            title: 'Home'
        },
        Detail: {
            screen: Detail,
            navigationOptions: {
                title: 'Home',
                header: null
            },
        },
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#4a148c' // 1a237e
            },
        },
    });

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
