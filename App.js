import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';

import AuthScreen from './screens/AuthScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import MapScreen from './screens/MapsScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';
import store from './store';

export default class App extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator(
      {
        welcome: {
          screen: WelcomeScreen, navigationOptions: { tabBarVisible: false }
        },
        auth: {
          screen: AuthScreen, navigationOptions: { tabBarVisible: false }
        },
        main: {
          navigationOptions: { tabBarVisible: false },
          screen: createBottomTabNavigator(
            {
              map: { screen: MapScreen },
              deck: { screen: DeckScreen },
              review: {
                screen: createStackNavigator({
                  review: { screen: ReviewScreen },
                  settings: { screen: SettingsScreen }
                }),
                navigationOptions: {
                  title: 'Review Jobs',
                  tabBarLabel: 'Review Jobs',
                  tabBarIcon: ({ tintColor }) => (
                    <Icon name="favorite" size={30} color={tintColor} />
                  )
                }
              }
            },
            {
              tabBarPosition: 'bottom',
              swipeEnabled: false,
              tabBarOptions: {
                labelStyle: { fontSize: 12 },
              }
            }
          )
        }
      }
    );

    const AppContainer = createAppContainer(MainNavigator);

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
