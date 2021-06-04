import * as React from "react";
import {
  Platform,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import DeckDetails from "./components/DeckDetails";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { purple, white } from "./utils/colors";

// import { TabNavigator, StackNavigator } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStacks() {
  return (
    <Stack.Navigator initialRouteName="Decks">
      <Stack.Screen name="Decks" component={DeckList} />
      <Stack.Screen name="DeckDetails" component={DeckDetails} />
      <Stack.Screen name="AddCard" component={AddCard} />
    </Stack.Navigator>
  );
}
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={MyStacks} />
      <Tab.Screen name="Add Deck" component={AddDeck} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      {/* <View> */}
      {/* <DeckList /> */}
      {/* <Text>boooooooo</Text> */}
      <NavigationContainer>
        <MyTabs />
        {/* <MyStacks /> */}
      </NavigationContainer>
      {/* </View> */}
    </Provider>
  );
}
