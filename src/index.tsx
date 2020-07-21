import React, { useState, useEffect, useRef } from 'react';
import { TabView as TabViewOriginal, Route } from 'react-native-tab-view';
import { View, Dimensions } from 'react-native';

const initialLayout = { width: Dimensions.get('window').width };

interface ScenesMap {
  [key: string]: React.ReactElement;
}

export const TabView: React.FC = (props) => {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([]);
  const scenes = useRef<ScenesMap>({});

  useEffect(() => {
    if (props.children) {
      let newRoutes: Route[] = [];
      React.Children.forEach(props.children, (children, tabIndex) => {
        if (React.isValidElement(children) && children.type === Tab) {
          const newKey = children.props.key
            ? children.props.key
            : 'tab_' + tabIndex;

          scenes.current[newKey] = children;

          let newRoute: Route = {
            key: newKey,
            icon: children.props.icon,
            title: children.props.title,
            accessible: children.props.accessible,
            accessibilityLabel: children.props.accessibilityLabel,
            testID: children.props.testID,
          };
          newRoutes.push(newRoute);
        }
        setRoutes(newRoutes);
      });
    }
  }, [props.children]);

  const renderScene = ({ route }: { route: any }) => {
    if (
      Math.abs(index - routes.findIndex((item) => item.key === route.key)) > 2
    ) {
      return <View />;
    }

    if (scenes.current[route.key]) {
      return scenes.current[route.key];
    }
    return null;
  };

  return (
    <TabViewOriginal
      {...props}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

export type TabProps = {
  key?: string;
  icon?: string;
  title?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};

export const Tab: React.FC<TabProps> = (props) => {
  return <View>{props.children}</View>;
};
