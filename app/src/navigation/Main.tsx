import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import LoginCpf from '../screens/LoginCpf.screen';
import PlaceHolderScreen from '../screens/PlaceHolder.screen';
import { Routes, RoutesParam } from './Routes';

const MainStack = createStackNavigator<RoutesParam>();
const PlaceHolderStack = createStackNavigator<RoutesParam>();

export type PlaceHolderStackNavigation = StackNavigationProp<RoutesParam, Routes.PLACEHOLDER_SCREEN>;

export default function Main() {
    return (
        <PlaceHolderStack.Navigator
            initialRouteName={Routes.LOGINCPF_SCREEN}
            screenOptions={{ headerShown: false }}>
            <PlaceHolderStack.Screen name={Routes.LOGINCPF_SCREEN} component={LoginCpf} />
            <PlaceHolderStack.Screen name={Routes.PLACEHOLDER_SCREEN} component={PlaceHolderScreen} />
        </PlaceHolderStack.Navigator>
    );
}
