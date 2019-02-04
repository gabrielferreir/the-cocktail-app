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

const App = createAppContainer(MainNavigator);

export default App;