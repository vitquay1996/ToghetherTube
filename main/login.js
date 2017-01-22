'use strict';

// var Signup = require('./Signup');
// var grabUser = require('../Model/grabUser');
import { 
  Container, 
  Header, 
  Title, 
  Content, 
  Text, 
  InputGroup, 
  Input, 
  Icon, 
  Button ,
  Card,
  CardItem,
  H3,
} from 'native-base';

var firebase = require('../Model/firebase');
const styles = require('../style/style')
import YouTube from 'react-native-youtube';
import React, { Component } from 'react';
import {
	StyleSheet,

	View,

  Dimensions,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
var windowSize = Dimensions.get('window');




class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			logged: false,
      profile: {},
      token: '',
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: false

    };


	}

  componentDidMount() {
    firebase.database().ref('status').on('value',(snap)=> {
      var state = snap.val();
      console.log(state.playing)
      if (state.playing === 1) {
        this.setState({isPlaying: true})
      } else {
        this.setState({isPlaying: false})
      }

    })
  }


  openLogin(){
    lock.show({closable: true}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      } else {
        if(!profile.extraInfo.email_verified) {
          AlertIOS.alert('Please verify your email before loggin in')
        } else {
          this.grabUserOrCreate(profile.userId,profile)

        }
      }
    });
    // let user ={
    //   "createdAt" : 1.471765823369E9,
    //   "email" : "dtrnggiang@gmail.com",
    //   "extraInfo" : {
    //     "clientID" : "hLxzMyG17Ae5Tga4l6PQYB3TwVmOQLIY",
    //     "email_verified" : true,
    //     "family_name" : "Giang",
    //     "gender" : "male",
    //     "given_name" : "Đào Trường",
    //     "global_client_id" : "TYzGHl00J8ehjGGVX7aNkW9uKZ2uzpRz",
    //     "locale" : "en",
    //     "updated_at" : "2016-08-22T07:18:04.011Z"
    //   },
    //   "identities" : [ {
    //     "connection" : "google-oauth2",
    //     "identityId" : "google-oauth2|106637632885548188656",
    //     "provider" : "google-oauth2",
    //     "social" : true,
    //     "userId" : "106637632885548188656"
    //   } ],
    //   "leader" : true,
    //   "name" : "Đào Trường Giang",
    //   "nickname" : "Heiseish",
    //   "picture" : "https://lh4.googleusercontent.com/-2kzDXZ1pREo/AAAAAAAAAAI/AAAAAAAAAIc/NDczG1pkvRw/photo.jpg",
    //   "position" : "Striker",
    //   "team" : "Facebook FC",
    //   "userId" : "google-oauth2|106637632885548188656"
    // }
    // this.props.navigator.push({
    //           name: 'Main',
    //           title: "Main",
    //           component: TabBar,
    //           passProps: {user:user,selectedTab: 'profile'}
    //       });
  }

  grabUserOrCreate(userId,profile){
    grabUser(userId,profile,(err,user)=>{
      if (user) {
        this.props.navigator.push({
              name: 'Main',
              title: "Main",
              component: TabBar,
              passProps: {user:user,selectedTab: 'profile'}
          });
      }
    })
  }

  openTouchId(){
    lock.show({
      connections: ["touchid"],
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      } else {
        if(!profile.extraInfo.email_verified) {
          AlertIOS.alert('Please verify your email before loggin in')
        } else {
          this.grabUserOrCreate(profile.userId,profile)

        }
      }
    });
  }
  sendSignal(){
    
    console.log('inside send')
    if (this.state.isPlaying === true) {
        firebase.database().ref('status').set({playing: 0});
      } else {
        console.log('hi')
        firebase.database().ref('status').set({playing: 1});
      }
  }
  returnVideoId(url){
    var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    return id[1];
  }

	render() {

		return (


			<View style={styles.container}>
      <Header >
      
      <Title>Room</Title>

      </Header>
      <View >
      
        <Text >{this.state.status}</Text>
        <YouTube
            ref="youtubePlayer"
        videoId={this.returnVideoId('https://www.youtube.com/watch?v=titpi2PKQVg')} // The YouTube video ID
        play={this.state.isPlaying}           // control playback of video with true/false
        hidden={false}        // control visiblity of the entire view
        playsInline={true}    // control whether the video should play inline
        loop={false}          // control whether the video should loop when ended
        controls={0}
        onReady={(e)=>{this.setState({isReady: true})}}
        onChangeState={(e)=>{this.setState({status: e.state})}}
        onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
        onError={(e)=>{this.setState({error: e.error})}}
        onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}

        style={styles.video}
        />
      </View>

        <TouchableHighlight style={styles.button}  underlayColor='transparent'
        onPress={()=>{this.sendSignal()}}>
          <View/>
        </TouchableHighlight>
        <Button large rounded block transparent onPress={()=>{this.refs.youtubePlayer.seekTo(60)}}>
        <Text>Hi</Text>
        </Button>

      

      </View>

			);
	}
};



module.exports = Login;
