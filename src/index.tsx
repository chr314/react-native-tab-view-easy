import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { TabView as TabViewOriginal, Route } from 'react-native-tab-view';
import { View, Dimensions, StyleProp, ViewStyle } from 'react-native';
import type { SceneRendererProps } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };

interface ScenesMap {
  [key: string]: ReactNode;
}

export type TabViewProps = {
  enableOptimizations?: boolean;
  onIndexChange?: (index: number) => void;
  renderTabBar?: (props: SceneRendererProps) => React.ReactNode;
  tabBarPosition?: 'top' | 'bottom';
  initialLayout?: {
    width?: number;
    height?: number;
  };
  lazy?: boolean;
  lazyPreloadDistance?: number;
  removeClippedSubviews?: boolean;
  sceneContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export const TabView = (props: TabViewProps) => {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<Route[]>([]);
  const scenes = useRef<ScenesMap>({});

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

  const renderScene = ({ route }: { route: any }) => {
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
  children: ReactNode;
};

export const Tab = (props: TabProps) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};
