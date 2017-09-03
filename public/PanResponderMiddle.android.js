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

export default class PanResponderMiddle extends Component {

    constructor(props) {
        super(props);
        this.state={
            leftViewWidth:0,
            rightViewWidth:0,
            leftViewColor:'grey',
            rightViewColor:'grey',
        };
        this.watcher=null;
        this.startFromLeft = true;          //刚碰屏幕是左面或右面
        this.moveNeedHandle = false;        //开始处理手移动的事件
    }

    /**
     * @param nativeEvent
     * @param gestureState
     * @private
     */
    _onPanResponderGrant=(e,gestureState)=>{
        let touchPoint = gestureState.x0;
        if(touchPoint<20)return;
        if(touchPoint>width-20)return;
        if(touchPoint>100&&touchPoint<width-100)return;

        this.moveNeedHandle = true;
        if(touchPoint <= 100){
            this.startFromLeft = true;
            let lw = touchPoint - 20;
            let rw = width - 20 -touchPoint;
            let leftC = 'green';

            this.setState({
                leftViewWidth:lw,
                rightViewWidth:rw,
                leftViewColor:leftC,
            });
        }else{
            this.startFromLeft = false;
            let lw = touchPoint - 20;
            let rw = width - 20 -touchPoint;
            let leftC = 'red';

            this.setState({
                leftViewWidth:lw,
                rightViewWidth:rw,
                rightViewColor:leftC,
            });
        }
    }

    _onPanResponderMove=(e,gestureState)=>{
        if(!this.moveNeedHandle)return false;
        let touchPoint = gestureState.moveX;
        if(this.startFromLeft){
            let lw = touchPoint - 20;
            let rw = width - 20 -touchPoint;
            let leftC = 'green';

            debugger;
            this.setState({
                leftViewWidth:lw,
                rightViewWidth:rw,
                leftViewColor:leftC,
            });
        }else{
            this.startFromLeft = false;
            let lw = touchPoint - 20;
            let rw = width - 20 -touchPoint;
            let leftC = 'red';

            this.setState({
                leftViewWidth:lw,
                rightViewWidth:rw,
                rightViewColor:leftC,
            });
        }

    }

    _onPanResponderEnd=(e,gestureState)=>{
        this.moveNeedHandle = false;
        this.startFromLeft = false;

        this.setState({
            leftViewWidth:0,
            rightViewWidth:0,
            leftViewColor:'grey',
            rightViewColor:'grey'
        });
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
                <View style={styles.mainModel} {...this.watcher.panHandlers}>
                    <View style={[styles.viewStyle,{width:this.state.leftViewWidth,backgroundColor:this.state.leftViewColor}]}></View>
                    <View style={[styles.viewStyle,{width:this.state.rightViewWidth,backgroundColor:this.state.rightViewColor}]}></View>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    mainModel:{
        width:width-40,
        height:50,
        left:20,
        top:50,
        flexDirection:'row',
        backgroundColor:'grey'
    },
    viewStyle:{
        backgroundColor:'red'
    }
});
