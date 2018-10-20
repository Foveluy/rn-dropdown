# rn-dropdown

a smart dropdown for morden react native, you don't need even worries about the position.

## Usage

```js
import React from "react";
import Dropdown from "rn-dropdown";
import { Text, View } from "react-native";

const headers = [
  { title: "first", key: "f", height: 300 },
  { title: "second", key: "s", height: 200 },
  { title: "third", key: "t", height: 250 }
];

export default class App extends React.Component {
  render() {
    return (
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
    );
  }
}
```
