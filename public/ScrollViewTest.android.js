/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    RefreshControl
} from 'react-native';

const s1 = 'android';
const s2 = '安卓';
const s3 = '安卓android'
export default class ScrollViewScreen extends Component {



    constructor(props) {
        super(props);
        this._scrollView = null;
        this.state = {reState: '没有刷新', isRefreshing: false, movieName: ''};
    }

    onScroll = () => {
        console.log('onScroll');
    }

    onRefresh = () => {
        this.setState({reState: '正在刷新', isRefreshing: true});
        this.getMovie();
    }

    loadFinish = () => {
        this.setState({reState: '结束刷新', isRefreshing: false});
    }

    getMovie = () => {
        fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                let movie = '';
                for (let i = 0; i < responseJson.movies.length; i++) {
                    movie = movie + responseJson.movies[i].title + '  ';
                }
                this.setState({movieName: movie});
                this.loadFinish();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this._scrollView.scrollTo({y:100})
    }

    _checkChinese = () =>{
        for(let str of 'an安卓'.split('')){
            var uni = str.charCodeAt(0);
            // 如果不在汉字范围内
            if (uni > 40869 || uni < 19968){
                debugger
                return false;
            }
        }
        debugger;
        return true;
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView style={styles.scrollView}
                            onscroll={this.onScroll}
                            refreshControl={
                                <RefreshControl
                                    onRefresh={this.onRefresh}
                                    refreshing={this.state.isRefreshing}
                                    tintColor='#ff0000'
                                    title='刷新'
                                    colors={['#ff0000', '#00ff00', '#0000ff']}
                                    progressBackgroundColor='#FFFFFF'>

                                </RefreshControl>
                            }>

                    <View style={{height: 500}}>
                        <Text style={styles.text}>
                            {this.state.movieName}
                        </Text>
                    </View>
                    <Button style={{height: 100}}
                    onPress={this._checkChinese}
                            title='1'>
                    </Button>

                    <Button style={{height: 100}}
                    onPress={this._checkChinese}
                            title='2'>
                    </Button>

                    <Button style={{height: 100}}
                    onPress={this._checkChinese}
                    title='3'>
                    </Button>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    textInputStyle: {
        margin: 20,
        fontSize: 20,
        backgroundColor: 'gray',
    },
    textPromoteStyle: {
        margin: 20,
        fontSize: 20,
    },
    text: {
        margin: 20,
        backgroundColor: 'gray',
        color: 'white',
        textAlign: 'center',
        fontSize: 30
    },
    button: {
        margin: 10
    },
    scrollView: {
        backgroundColor: '#aaaaaa'
    },
    midScrollView: {
        height: 150,
        borderWidth: 1,
        borderColor: 'black'
    },
});
