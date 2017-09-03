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


export default class WebFetch extends Component {
    constructor(props) {
        super(props);
        this.state = {netWorkState: '', movieName: ''};
    }

    removeEventListener: null

    changeState = (state) => {
        this.setState({netWorkState: state});
    }

    componentWillMount() {
        NetInfo.fetch().done(
            (reach) => {
                this.setState({netWorkState: reach});
            }
        );
        this.removeEventListener = NetInfo.addEventListener('change', this.changeState);
    }

    componentWillUnmount() {
        this.removeEventListener();
    }

    getMovie = () => {
        fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                let movie = '';
                for (let i = 0; i < responseJson.movies.length; i++) {
                    movie = movie + responseJson.movies[i].title+'  ';
                }
                this.setState({movieName: movie});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    jumpToScrollView=()=>{
        this.props.navigation.navigate('ScrollTest')
    }

    jumpToListView=()=>{
        this.props.navigation.navigate('ListViewTest')
    }

    jumpToPanResponder=()=>{
        this.props.navigation.navigate('PanResponder1')
    }
    jumpToPanResponderr=()=>{
        this.props.navigation.navigate('PanResponderMiddle')
    }

    jumpToPanResponderrrr=()=>{
        this.props.navigation.navigate('PanResponderMiddleCopy')
    }

    jumpTolpt=()=>{
        this.props.navigation.navigate('ReactNativeViewPager')
    }

    jumpList=()=>{
        this.props.navigation.navigate('ReactNatiFlatList')
    }

    jumpToDiaryList=()=>{
        this.props.navigation.navigate('Diarys')
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    当前网络状态：{this.state.netWorkState}
                </Text>

                <Text style={styles.welcome}>
                    电影名称：{this.state.movieName}
                </Text>
                <Button onPress={this.getMovie} style={styles.button1} title='获取电影信息'>
                </Button>

                <Button onPress={this.jumpToScrollView} style={styles.button1} title='ScrollView' >
                </Button>

                <Button onPress={this.jumpToListView} style={styles.button1} title='ListView' >
                </Button>

                <Button onPress={this.jumpToPanResponder} style={styles.button1} title='panResponder' >
                </Button>

                <Button onPress={this.jumpToPanResponderr} style={styles.button1} title='PanResponderr' >
                </Button>

                <Button onPress={this.jumpToPanResponderrrr} style={styles.button1} title='PanResponderrrr' >
                </Button>

                <Button onPress={this.jumpTolpt} style={styles.button1} title='jumpTolpt' >
                </Button>

                <Button onPress={this.jumpList} style={styles.button1} title='lt' >
                </Button>

                <Button onPress={this.jumpToDiaryList} style={styles.button1} title='Diary' >
                </Button>
            </View>
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
    button1:{
        marginTop:10,
        padding:10,
        margin:10,
        height:50
    }
});

