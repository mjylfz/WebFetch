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
    FlatList,
    Image,
    PanResponder,
} from 'react-native';

Dimensions = require('Dimensions');
width = Dimensions.get('window').width;
height = Dimensions.get('window').height;

export default class ListViewScreen extends Component {


    constructor(props) {
        super(props);
        this._scrollView = null;
        this.state = {
            dataSource:new FlatList.DataSource({
                rowHasChanged:((row1,row2)=>row1!=row2)
            }),
            isRefreshing:false,
        };
    }

    componentDidMount() {
        this._scrollView.scrollTo({y:100})
    }

    renderView=()=>{
        return (
            <View style={{flex:1}} {...this.watcher.panHandlers}>
                <FlatList
                    ref = {ref=>this._scrollView = ref}
                    dataSource={this.state.dataSource}
                          renderRow={this.renderRow}
                        onTouchStart={this._onTouchStart}
                        onTouchMove={this._onTouchMove}
                        onTouchEnd={this._onTouchEnd}
                          refreshControl={
                              <RefreshControl
                                  onRefresh={this._onRefresh}
                                  refreshing={this.state.isRefreshing}
                                  tintColor='#ff0000'
                                  title='刷新'
                                  colors={['#ff0000', '#00ff00', '#0000ff']}
                                  progressBackgroundColor='#FFFFFF'>

                              </RefreshControl>
                          }
                        >
                </FlatList>
            </View>
        );
    }

    _onTouchStart = () => {
        debugger;
        console.log('start');
    }

    _onTouchMove = () => {
        debugger;
        console.log('move');
    }

    _onTouchEnd = () => {
        debugger;
        console.log('end');
    }

    _onRefresh = () => {
        this.setState({refreshing:true});
        this.getData();
    }

    renderRow=(data,sessionID,row)=>{
        console.log("data" + data);
        return (
            <View style={{flex:1}}>
                <Image source={{uri:data.url}}
                       style={{width:width,height:height/2,marginTop:5}}
                />
            </View>
        );
    }

    getData=()=>{
        fetch('http://gank.io/api/search/query/listview/category/福利/count/10/page/1').
        then((response)=>response.json()).
        then((responseText)=>{
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(responseText.results),
                refreshing:false,
            });

        }).
        catch((error)=>{
            console.warn(error);
        }).
        done();

    }

    _onPanResponderGrant = () =>{
        debugger
        console.log('onPanGrant');
    }

    _onPanResponderMove = () =>{
        debugger
        console.log('onPanMove');
    }

    _onPanResponderEnd = () =>{
        debugger
        console.log('onPanEnd');
    }

    _onPanResponderRelease = () =>{
        debugger
        console.log('onPanRelease');
    }

    componentWillMount() {
        this.watcher = PanResponder.create({
            onStartShouldSetPanResponder:()=>true,
            onPanResponderGrant:this._onPanResponderGrant,
            onPanResponderMove:this._onPanResponderMove,
            onPanResponderEnd:this._onPanResponderEnd,
            onPanResponderRelease:this._onPanResponderRelease,
        });
    }

    componentDidMount()
    {
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
