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
    FlatList
} from 'react-native';

export default class FlatLis extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data:[],
        };
        this._flatlist = null;
    }

    //头布局
    _header=()=>{
        return (<Text>head布局</Text>);
    }

    //尾布局
    _bottom=()=>{
        return (<Text>bottom布局</Text>);
    }

    //分隔符
    _separator=()=>{
        return (<View style={{height:2,backgroundColor:'black'}}/>)
    }

    //布局渲染
    _renderItem=(itemData)=>{
        // let title = '第' +item.index+ '项'+item.item.title;
        //此处获得数据需要itemData.item才可以
        // return (
        //     <Text style={{backgroundColor:color}}>{itemData.item.value.desc}</Text>);

        return (
            <Text style={{backgroundColor:'gray'}}>{itemData.index}</Text>);
    }

    renderView =()=>{
        return (
        <View style={{flex :1}}>
            <Button title="点击滚动"
            onPress={()=>{
                // this._flatlist.scrollToIndex({viewPosition:0,index:8});
                this._flatlist.scrollToOffset({offset:100});
            }}/>
            <FlatList
            ref={(flatlist)=>{this._flatlist = flatlist}}
            ListHeaderComponent={this._header}
            ListFooterComponent = {this._bottom}
            ItemSeparatorComponent={this._separator}
            renderItem={this._renderItem}
            data={this.state.data}
            />
        </View>);
    }


    initData = () =>{
        var data = [];
        for(let i = 0;i<80;i++){
            data.push({index:i,title:i + ''});
        }
        this.setState({data:data})
    }

    getData = () => {
        fetch('http://gank.io/api/search/query/listview/category/福利/count/10/page/1').
        then((response) => response.json()).
        then((responseText) => {
            let datas = responseText.results;
            let dataArray = [];
            let i = 0;
            datas.map(
                (item)=>{
                    dataArray.push({
                        key:i,
                        value:item,
                    });
                    i++;
                }
            );
            this.setState({
                data: dataArray,
            });

            datas = null;
            dataArray = null;

        }).catch((error) => {
            console.warn(error);
        }).done();

    }

    componentDidMount() {
        // this.getData();
        this.initData();
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
