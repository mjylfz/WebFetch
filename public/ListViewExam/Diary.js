//日记编辑
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Image,
    Dimensions,
    Alert

} from 'react-native';
import DataUtils from './dataUtils'
export default class Diary extends Component {


    constructor(props) {
        super(props);
        this.title = '';
        this.text = '';
        const {dataList, sectionID,rowID} = this.props.navigation.state.params;
        this.dataList = dataList;
        this.sectionID = sectionID;
        this.rowID = rowID;
        this.state = {
            rowData:this.dataList[this.rowID],
        };
        debugger;
    }


    componentWillMount() {
    }

    componentWillReceiveProps(props) {
    }

    componentDidMount() {
    }

    _showNextDiary = () => {if(this.rowID < this.dataList.length - 1){
        this.rowID++;
        this.setState({rowData:this.dataList[this.rowID]})
    }

    }

    _showPreviousDiary = () => {
        if(this.rowID > 0){
            this.rowID--;
            this.setState({rowData:this.dataList[this.rowID]})
        }
    }

    render() {
        const {width,height} = Dimensions.get('window');
        this.width = width;
        this.height = height;
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.search}
                    onChangeText={(text)=>{this.title = text}}
                    value={this.state.rowData.title}
                >
                </TextInput>
                <TextInput
                    style={[styles.search,{height:200}]}
                    onChangeText={(text)=>{this.text = text}}
                    value={this.state.rowData.text}>
                </TextInput>
                <TouchableOpacity onPress={this._showPreviousDiary}>
                    <Text style={styles.write}>上一篇</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._showNextDiary}>
                    <Text style={styles.write}>下一篇</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const {width,height} = Dimensions.get('window');
this.width = width;
this.height = height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header:{
        height:50,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#eeeeee'
    },

    search:{
        borderWidth:1,
        borderRadius:5,
        width:this.width,
        borderColor:'#aaaaaa',
        margin:5,
        height:40,

    },

    write:{
        height:30,
        width:this.width,
        textAlign :'center',
        justifyContent:'center',
        backgroundColor:'#008888',
        color:'white',
        padding:5,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#aaaaaa'
    },

    row:{
        height:60,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#aaaaaa',
        flexDirection:'row',
        backgroundColor:'#eeeeee',
        margin:3
    },
    text:{
        height:50,
        margin:5
    }

});
