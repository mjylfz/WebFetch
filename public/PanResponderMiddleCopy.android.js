/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    ProgressBarAndroid,
    Text,
    PanResponder,
    StyleSheet
} from 'react-native';

Dimensions = require('Dimensions');
width = Dimensions.get('window').width;
height = Dimensions.get('window').height;

export default class PanResponderMiddleCopy extends Component {
    constructor(props) {
        super(props);
        this.state={
            left:1,
        };
        this.startX = 0;
        this.watcher=null;
        this.arrive = false;
    }

    /**
     * @param nativeEvent
     * @param gestureState
     * @private
     */
    _onPanResponderGrant=(e,gestureState)=>{
        if(gestureState.x0 > 20+48)return;
        this.startX = gestureState.x0;
        //起始触摸的位置
    }

    _onPanResponderMove=(e,gestureState)=>{
        if(this.startX < 10){
            return;
        }
        let touchP = gestureState.moveX;
        if(touchP<this.startX){
            this.setState({left:0});
            this.arrive = false;
        } else{
            if(touchP<width-20-48){
                this.setState({left:touchP - this.startX});
                this.arrive = false;
            }
            else{
                this.setState({left:width-40-48});
                this.arrive = true;
            }
        }
    }

    _onPanResponderEnd=(e,gestureState)=>{
        if(this.arrive){

        }else{
            this.startX = 0;
            this.setState({left:1});
            this.arrive = false;
        }
    }

    componentWillMount() {
        this.watcher = PanResponder.create({
            onStartShouldSetPanResponder:()=>true,
            onPanResponderGrant:this._onPanResponderGrant,
            onPanResponderMove:this._onPanResponderMove,
            onPanResponderEnd:this._onPanResponderEnd,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewStyle} {...this.watcher.panHandlers}>
                    <View style={[styles.btn ,{left:this.state.left}]}></View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    viewStyle:{
        borderRadius:25,
        width : width-40,
        height:50,
        left:20,
        top:50,
        backgroundColor:'grey',
        flexDirection:'row'
    },
    btn:{
        top:1,
        width:48,
        height:48,
        borderRadius:24,
        backgroundColor:'white',
    }
});
