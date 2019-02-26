import Home from './home';
import Detail from './detail';
import {createStackNavigator} from 'react-navigation';

export default createStackNavigator({
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