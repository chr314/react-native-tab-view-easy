import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TabView, Tab } from 'react-native-tab-view-easy';
import { useState } from 'react';

export default function App() {
  const [test, setTest] = useState(true);

  return (
    <View style={styles.container}>
      <TabView>
        <Tab title={'Tab 1'}>
          <Text>Tab 1</Text>
          <Text>{test ? 'text' : 'cool text'}</Text>
        </Tab>
        {test && (
          <Tab title={'Tab 2'}>
            <Text>Tab 2</Text>
            <Text>text</Text>
          </Tab>
        )}
      </TabView>

      <Button title={'Change'} onPress={() => setTest(!test)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
