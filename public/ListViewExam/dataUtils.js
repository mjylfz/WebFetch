/**
 * Created by Fangzhou.Li on 2017/9/3.
 */
import {AsyncStorage} from 'react-native';
import warning from 'fbjs/lib/warning'
export default class DataUtils{
    /**
     * 获得所有的数据
     */
    static getAllDiarys(){
        return new Promise(
            (resolve,reject)=>{
                AsyncStorage.getAllKeys()
                    .then((keys)=>{
                    debugger;
                    //获得所有的key
                        //没有
                        if(keys.length == 0){
                            let value = {
                                data:[]
                            }
                            resolve(value);
                            return;
                        }

                        //获取所有的内容
                        AsyncStorage.multiGet(keys)
                            .then(results=>{
                                debugger;
                                let data = []
                                results.forEach((item)=>{
                                    data.push(JSON.parse(item[1]));
                                })
                                let value = {
                                    data:data
                                }
                                debugger;
                                resolve(value);
                            })
                            .catch(err=>{
                                debugger;
                                reject(new Error('Request Error'));
                                warning(err);
                            });
                    }).catch(err=>{
                        debugger;
                        reject(new Error('Request Error'));
                        warning(err);
                })
            }
        );
    }

    static saveDiary(data){
        return new Promise((resolve,reject)=>{
            let time = new Date();
            data = {
                ...data,
                time : time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + ''
            }
            let key = Date.parse(time) + '';

            AsyncStorage.setItem(key,JSON.stringify(data))
                .then(()=>{
                    resolve();
                })
                .catch(err=>{
                    reject(new Error('Request Error'));
                    warning(err);
                })
        });
    }

    static clearData(){
        AsyncStorage.clear();
    }

    static getPreviousDiary(){

    }

    static getNextDiary(){

    }
}