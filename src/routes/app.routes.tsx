import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { NewClient } from '../screens/NewClient';
import { Schedule } from '../screens/Schedule';
import { NewSchedule } from '../screens/NewSchedule';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="new" component={NewClient} />
      <Screen name="schedule" component={Schedule} />
      <Screen name="newSchedule" component={NewSchedule} />
    </Navigator>
  );
}