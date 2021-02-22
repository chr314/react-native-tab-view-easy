# react-native-tab-view-easy

A cross-platform Tab View component for React Native based on `react-native-tab-view` with easier syntax

## Installation

```sh
yarn add react-native-tab-view-easy
```
OR
```sh
npm install react-native-tab-view-easy
```


Now we need to install `react-native-tab-view`, `react-native-gesture-handler` and `react-native-reanimated`

```sh
yarn add react-native-tab-view react-native-gesture-handler react-native-reanimated
```
OR
```sh
npm install react-native-tab-view react-native-gesture-handler react-native-reanimated
```
## Usage

```js
import { TabView, Tab } from 'react-native-tab-view-easy';

// ...

<TabView>
  <Tab title={'Tab 1'}>
    <Text>Content</Text>
  </Tab>

  <Tab title={'Tab 2'}>
    <Text>Content</Text>
  </Tab>
</TabView>
```

## License

MIT
