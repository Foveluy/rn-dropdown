import React from "react";
import Dropdown from "./index";
import { Text, View, StyleSheet } from "react-native";

const headers = [
  { title: "first", key: "f", height: 300 },
  { title: "second", key: "s", height: 200 },
  { title: "third", key: "t", height: 250 }
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Dropdown headers={headers}>
          <View>
            <Text>first</Text>
          </View>
          <View>
            <Text>second</Text>
          </View>
          <View>
            <Text>third</Text>
          </View>
        </Dropdown>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center"
  }
});
