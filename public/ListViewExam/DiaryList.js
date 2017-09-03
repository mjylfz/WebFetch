//日记外层
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList
} from 'react-native';
import DiaryListUI from './DiaryListUI'
import DataUtils from './dataUtils'
export default class DiaryList extends Component {

    static navigationOptions = {
        title:'日记',
        headerLeft:null,
        headerTitleStyle:{
            alignSelf:'center'
        },

    }

    constructor(props) {
        super(props);
        this.state = {
            diaryList:[],
        }
    }

    componentWillMount() {
        this._getDiaryList();
    }

    componentDidMount() {
    }

    _getDiaryList = () => {
        DataUtils.getAllDiarys()
            .then((data)=>{
                this.setState({diaryList:data.data})
            })
            .catch(err=>{

            });
    }

    _writeDiary = () => {
        this.props.navigation.navigate('DEdit',{
            getDiaryList:this._getDiaryList
        });
    }

    _onPressRow = (rowData,sectionId,rowID) =>{
        this.props.navigation.navigate('Diary',
            {
                dataList:this.state.diaryList,
                rowData:rowData,
                sectionID:sectionId,
                rowID:rowID
            });
    }

    _clearData = () => {
        DataUtils.clearData();
        this._getDiaryList();
    }

    render() {
        return (
            <DiaryListUI
                style={styles.container}
                diaryList = {this.state.diaryList}
                writeDiary={this._writeDiary}
                clearData={this._clearData}
                onPressRow={this._onPressRow}>

            </DiaryListUI>
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
