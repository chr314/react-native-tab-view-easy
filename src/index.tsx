import React, { useState, useEffect, useRef, ReactNode } from 'react';
import {
  TabView as TabViewOriginal,
  Route,
  TabViewProps as TabViewPropsOriginal,
} from 'react-native-tab-view';
import { View, useWindowDimensions } from 'react-native';

interface ScenesMap {
  [key: string]: ReactNode;
}

export type TabViewProps = {
  enableOptimizations?: boolean;
  children: ReactNode;
} & Omit<
  Partial<TabViewPropsOriginal<Route>>,
  'navigationState' | 'renderScene' | 'onIndexChange'
>;

export const TabView = (props: TabViewProps) => {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([]);
  const scenes = useRef<ScenesMap>({});

  const layout = useWindowDimensions();

  useEffect(() => {
    if (props.children) {
      let newRoutes: Route[] = [];
      React.Children.forEach(props.children, (children, tabIndex) => {
        if (React.isValidElement(children) && children.type === Tab) {
          const newKey = children.props.key || 'tab_' + tabIndex;

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

  const renderScene = ({ route }: { route: Route }) => {
    if (
      props.enableOptimizations &&
      Math.abs(index - routes.findIndex((item) => item.key === route.key)) > 2
    ) {
      return <View />;
    }

    if (scenes.current[route.key]) {
      return scenes.current[route.key];
    }
    return null;
  };

  if (routes.length) {
    return (
      // @ts-ignore
      <TabViewOriginal
        {...props}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={props.initialLayout || { width: layout.width }}
      />
    );
  }
  return null;
};

export type TabProps = {
  key?: string;
  icon?: string;
  title?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  testID?: string;
  children: ReactNode;
};

export const Tab = (props: TabProps) => {
  return <>{props.children}</>;
};
