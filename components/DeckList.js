import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import { getDecks } from "../utils/api";
import { AppLoading } from "expo";
import { purple } from "../utils/colors";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

class DeckList extends Component {
  state = {
    ready: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then((decks) => {
        console.log(decks);
        dispatch(receiveDecks(decks));
      })
      .then(() => this.setState(() => ({ ready: true })));
  }

  render() {
    console.log(this.props);
    const { decks } = this.props;
    if (this.state.ready === false) {
      // return <AppLoading />;
    }

    return (
      <ScrollView>
        {Object.keys(decks).map((title) => {
          console.log(decks, title);
          return (
            <TouchableOpacity
              key={title}
              onPress={() =>
                this.props.navigation.navigate("DeckDetails", {
                  title: title,
                })
              }
            >
              <Text style={styles.heading}>
                {decks[title].title ? decks[title].title : "No Title"}
              </Text>
              <Text style={styles.subheading}>
                {Object.keys(decks[title].questions).length} cards
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor: purple,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  heading: {
    marginTop: 15,
    fontWeight: "600",
    marginBottom: 15,
    fontSize: 22,
    textAlign: "center",
  },
  subheading: {
    marginBottom: 15,
    textAlign: "center",
  },
});
const mapStateToProps = (decks, { navigation }) => {
  return {
    decks,
    totalDecks: Object.keys(decks).length,
    navigation,
  };
};

export default connect(mapStateToProps)(DeckList);
