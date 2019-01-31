import Home from './src/home';
import Detail from './src/detail';
import {createStackNavigator, createAppContainer} from 'react-navigation';


const MainNavigator = createStackNavigator({
        Home: {
            screen: Home,
            title: 'Home'
        },
        Detail: {screen: Detail},
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#303f9f'
            },
        },
    });

const App = createAppContainer(MainNavigator);

export default App;