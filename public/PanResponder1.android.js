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

export default class PanResponder1 extends Component {


    constructor(props) {
        super(props);
        this.state={progress:0};
        this.watcher=null;
    }

    _onPanResponderGrant=(e,gestureState)=>{
        let touchPointX = gestureState.x0;
        debugger;
        let progress;
        if(touchPointX<20){
            progress = 0;
        }else{
            if(touchPointX>width-20){
                progress = 1;
            }else{
                progress = (touchPointX-20)/(width-40);
            }
        }
        this.setState({progress:0});
    }

    _onPanResponderMove=(e,gestureState)=>{
        let touchPointX = gestureState.moveX;
        debugger;
        let progress;
        if(touchPointX<20){
            progress = 0;
        }else{
            if(touchPointX>width-20){
                progress = 1;
            }else{
                progress = (touchPointX-20)/(width-40);
            }
        }
        this.setState({progress:progress});
    }

    componentWillMount() {
        this.watcher = PanResponder.create({
            onStartShouldSetPanResponder:()=>true,
            onPanResponderGrant:this._onPanResponderGrant,
            onPanResponderMove:this._onPanResponderMove,
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <ProgressBarAndroid style={styles.progressView1}
             styleAttr='Horizontal'
             indeterminate={false}
             progress={this.state.progress}/>

                <Text style={styles.textStyle}>
                    你选择了{Math.round(this.state.progress*100)}%
                </Text>
                <Text style={styles.touchViewStyle}
                      {...this.watcher.panHandlers}>

                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    progressView1:{
        width: width - 40,
        left: 20,
        top: 50,
    },
    container:{
        flex:1,
    },
    touchViewStyle:{
        width:width-20,
        height:40,
        backgroundColor:'transparent',
        position:'absolute',
        left:10,
        top:30
    },
    textStyle:{
        fontSize:20,
        left:20,
        top:70
    }
});
