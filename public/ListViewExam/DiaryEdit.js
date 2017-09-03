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
export default class DiaryEdit extends Component {


    constructor(props) {
        super(props);
        this.state = {
        };
        this.title = '';
        this.text = '';
    }


    componentWillMount() {
    }

    componentWillReceiveProps(props) {
    }

    componentDidMount() {
    }

    _saveDiary = () => {
        let value = {
            title: this.title,
            text: this.text
        }
        DataUtils.saveDiary(value)
            .then(()=>{
                const {getDiaryList} = this.props.navigation.state.params;
                getDiaryList && getDiaryList();
                Alert.alert('','保存成功',[{text:'确定'}])
            })
            .catch((err) => {
            })
    }

    render() {
        const {width,height} = Dimensions.get('window');
        this.width = width;
        this.height = height;
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.search}
                    placeholder='title'
                    onChangeText={(text)=>{this.title = text}}
                >
                </TextInput>
                <TextInput
                    style={[styles.search,{height:200}]}
                    placeholder='text'
                    onChangeText={(text)=>{this.text = text}}>
                </TextInput>
                <TouchableOpacity onPress={this._saveDiary}>
                    <Text style={styles.write}>保存</Text>
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
