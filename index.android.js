/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NetInfo,
    Button,
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation';

import ScrollViewScreen from './public/ScrollViewTest'
import MainActivity from './public/MainActivity'
import ListViewScreen from './public/ListViewScreen'
import PanResponder1 from './public/PanResponder1'
import PanResponderMiddle from './public/PanResponderMiddle'
import PanResponderMiddleCopy from './public/PanResponderMiddleCopy'
import ViewPagerTest from './public/ViewPagerTest'
import FlatLis from './public/FlatList'
import DiaryList from './public/ListViewExam/DiaryList'
import DiaryEdit from './public/ListViewExam/DiaryEdit'
import Diary from './public/ListViewExam/Diary'

const SimpleApp = StackNavigator({
        HomeScreen: {screen: MainActivity},
        ScrollTest: {screen: ScrollViewScreen},
        ListViewTest: {screen: ListViewScreen},
        PanResponder1: {screen: PanResponder1},
        PanResponderMiddle: {screen: PanResponderMiddle},
        PanResponderMiddleCopy: {screen: PanResponderMiddleCopy},
        ReactNativeViewPager: {screen: ViewPagerTest},
        ReactNatiFlatList: {screen: FlatLis},
        Diarys:{screen:DiaryList},
        DEdit:{screen:DiaryEdit},
        Diary:{screen:Diary}
    }
);

export default class WebFetch extends Component {

    render() {
        return (
            <SimpleApp>
            </SimpleApp>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('WebFetch', () => SimpleApp);
