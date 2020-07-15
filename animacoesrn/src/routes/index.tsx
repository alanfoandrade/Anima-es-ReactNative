import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Timing from '../pages/Timing';
import Spring from '../pages/Spring';
import Decay from '../pages/Decay';
import TwoAxis from '../pages/TwoAxis';
import Interpolate from '../pages/Interpolate';
import PanResponding from '../pages/PanResponding';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Timing"
        component={Timing}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Spring"
        component={Spring}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Decay"
        component={Decay}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TwoAxis"
        component={TwoAxis}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Interpolate"
        component={Interpolate}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PanResponding"
        component={PanResponding}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
