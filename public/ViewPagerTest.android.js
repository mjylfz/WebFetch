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
    RefreshControl,
    ListView,
    Image,
} from 'react-native';

var ViewPager = require('react-native-viewpager');
export default class ListViewScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ViewPager.DataSource({
                pageHasChanged: ((p1, p2) => p1 != p2)
            }),
            loading: false,
        };
    }

    renderView = () => {
        return (<ViewPager dataSource={this.state.dataSource}
                           renderPage={this.renderPage}
                           isloop={false}
                           autoPlay={false}/>);
    }

    renderPage = (data, pageId, currentPage) => {
        return (
            <View style={{flex: 1}}>
                <Image source={{uri: data.url}}
                       style={{width: width, height: height / 2}}
                />
            </View>
        );
    }

    getData = () => {
        fetch('http://gank.io/api/search/query/listview/category/福利/count/10/page/1').
        then((response) => response.json()).
        then((responseText) => {
            this.setState({
                loading: false,
                dataSource: this.state.dataSource.cloneWithPages(responseText.results),
            });

        }).catch((error) => {
            console.warn(error);
        }).done();

    }

    componentDidMount() {
        //此处要加括号
        this.getData();
    }


    render() {
        return (
            this.renderView()
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
