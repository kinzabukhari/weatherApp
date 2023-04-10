import React,{useState,useEffect} from 'react';
import { TextInput,Button,Card,Title} from 'react-native-paper';
import {View,Text,FlatList,Image} from 'react-native'
import Header from './Header'
import AsyncStorage from '@react-native-community/async-storage';


const Home = (props)=>{
    const [info,setInfo] = useState({
        name:"loading !!",
        temp:"loading",
        humidity:"loading",
        desc:"loading",
        icon:"loading"
    })
    useEffect(()=>{
       getWeather()
    },[])
    const getWeather = async ()=>{
        let MyCity = await AsyncStorage.getItem("newcity")
        if(!MyCity){
           const {city} = props.route.params
           MyCity = city  
        }
       

     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&APPID=91e97df93139086b53ac616aa98d9704&units=metric`)
     .then(data=>data.json())
     .then(results=>{
        setInfo({
            name:results.name,
            temp:results.main.temp,
            humidity:results.main.humidity,
            desc:results.weather[0].description,
            icon:results.weather[0].icon,
        })
     })
     .catch(err=>{
         alert(err.message)
     })
    }
    if(props.route.params.city != "london"){
        getWeather()
    }
    return(
        <View style={{flex:1}}>
            <Header name="Weather App" />
           <View style={{alignItems:"center"}}>
               <Title 
               style={{
                   color:'#080808',
                   marginTop:32,
                   fontSize:30
               }}>
                   {info.name}
               </Title>
               <Image 
               style={{
                   width:120,
                   height:120
               }}
               source={{uri:"https://openweathermap.org/img/w/"+info.icon+".png"}}
               
               />

           </View>

           <Card style={{
               margin:8,
               padding:12
           }}>
           <Title style={{color:"#080808"}}>Temperature - {info.temp} °C</Title>
           </Card>
           <Card style={{
               margin:8,
               padding:12
           }}>
           <Title style={{color:"#080808"}}>Humidity - {info.humidity}</Title>
           </Card>
           <Card style={{
               margin:8,
               padding:12
           }}>
           <Title style={{color:"#080808"}}>Description -  {info.desc}</Title>
           </Card>
        </View>
    )
}


export default Home
