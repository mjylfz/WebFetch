//日记内侧
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

} from 'react-native';
export default class DiaryListUI extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2)=>row1!==row2
            })
        };
    }


    componentWillMount() {
        //数据从外面传进来
        this.props.diaryList && this.setState({dataSource:this.state.dataSource.cloneWithRows(this.props.diaryList)});
    }

    //更新props后更新state
    componentWillReceiveProps(props) {
        debugger;
        this.setState({dataSource:this.state.dataSource.cloneWithRows(props.diaryList)})
    }

    componentDidMount() {
    }

    /**
     * 搜索框的变化
     * @param text
     */
    updateSearch = (text) => {

    }

    /**
     * 写
     * @private
     */
    _writeDiary = () => {
        this.props.writeDiary &&　this.props.writeDiary();
    }

    _clearData = () => {
        this.props.clearData &&　this.props.clearData();
    }
    _pressRow = (rowData,sectionId, rowID) => {
        this.props.onPressRow && this.props.onPressRow(rowData,sectionId,rowID);
    }

    _renderRow = (rowData,sectionID,rowID) => {
        debugger;
        return (
            <TouchableOpacity onPress={()=>{this._pressRow(rowData,sectionID,rowID)}}>
                <View style={[styles.row,{width:this.width}]}>
                    <View style={{width:50,height:50}}></View>
                    <View style={[styles.text,{width:this.width - 50}]}>
                        <Text style={{flex:1,fontSize:16}}>{rowData.title}</Text>
                        <Text style={{flex:1}}>{rowData.text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const {width,height} = Dimensions.get('window');
        this.width = width;
        this.height = height;
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <View style={[styles.header,{width:width}]}>
                    <TextInput style={styles.search}
                               underlineColorAndroid='transparent'
                               placeholder='搜索'
                               onChangeText={this.updateSearch}>

                    </TextInput>

                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={this._writeDiary}>
                        <Text style={styles.write}>
                            写日记
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={this._clearData}>
                        <Text style={styles.write}>
                            清除数据
                        </Text>
                    </TouchableOpacity>
                </View>

                <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}/>
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
    header:{
        height:50,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#eeeeee'
    },

    search:{
        borderWidth:1,
        borderRadius:5,
        borderColor:'#aaaaaa',
        margin:5,
        width:200,
        height:40,
    },

    write:{
        height:30,
        width:80,
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
