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
  Spinner,
  Thumbnail
} from 'native-base';

var firebase = require('../Model/firebase');
const styles = require('../style/style')
import YouTube from 'react-native-youtube';
import React, { Component } from 'react';
import {
	StyleSheet,

	View,
  AlertIOS,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Platform,
  RefreshControl,
  Modal,
  ListView,
  ScrollView,
} from 'react-native';
var windowSize = Dimensions.get('window');

class Main extends Component{
  constructor(props) {
    super(props);

    this.state = {

      rooms:[],
      noRoom: true,
      isLoading: true
    }
  }

  componentDidMount(){
    var arr = []
    firebase.database().ref('rooms').once('value').then((snap)=>{
      snap.forEach((child)=>{
              console.log(child.val())
              arr.push(child.val())
            })


        if (arr.length !== 0) {
          this.setState({noRoom: false,isLoading: false,rooms:arr})
        } else {
          this.setState({isLoading: false})
        }
      })
  }

  render(){
    return(
      <View style={styles.container}>
        {this.state.isLoading ? <Spinner style={{alignSelf: 'center',top:300}}color='red'/> :
        <View style={styles.container}>
          {this.state.noRoom ? <CreateRoomView navigator={this.props.navigator}/> : <ListOfRooms rooms={this.state.rooms} navigator={this.props.navigator}/> }
        </View>}
      </View>
    )
  }

}

class CreateRoomView extends Component{
  constructor(props){
    super(props);

  }

  createRoom(){
    AlertIOS.prompt(
      'Enter a name',
        null,
        (text) => {
          firebase.database().ref('rooms/' + text).set({playing: 0,synch: 0, videoId: '-dwGEwaCTbA',name: text});
          this.props.navigator.push({
            name: 'Room',
            title: 'Room',
            component: Login,
            passProps: {name: text,room:{playing: 0,synch: 0, videoId: '-dwGEwaCTbA',name: text}}
          })
        }
    );
  }
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.whiteFont}> There is currently no room available </Text>
        <View style={styles.createRoom}>
          <Button bordered rounded bloack info onPress={()=>{this.createRoom()}}>
            <Text>Create Room</Text>
          </Button>
          </View>
      </View>
    )
  }
}

class ListOfRooms extends Component{
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1.id !== row2.id});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.rooms),
      radio1 : true,
      check1: false,
      modalVisible: false,
      selectedItem: undefined,
      isLoading: false,
      refreshing: false,

    }
  }




  _onRefresh() {
    this.setState({refreshing: true});
    this._refreshArray('finished',(err)=>{
      if (!err) this.setState({refreshing:false})
    })
  }

  _refreshArray(state,cb){

    this.returnRooms((err,arr)=>{
      if (!err)
        this.setState({
          refreshing: false,
          dataSource: this.ds.cloneWithRows(arr)
        })

    })



  }
  returnRooms(cb){
    let arr = []
    firebase.database().ref('rooms').limitToLast(50).once('value').then((snap)=>{
      snap.forEach((child)=>{
              // console.log(child.val())
              arr.push(child.val())
            })


      cb(null,arr);
    })


  }

  joinRoom(room){
    this.props.navigator.push({
      name: 'room',
      title: 'room',
      component: Login,
      passProps:{name: room.name,room: room}
    })
  }



  renderRow(room) {
    return (
      <View style={styles.row}>
        <TouchableHighlight underlayColor='transparent' onPress={()=>{this.joinRoom(room)}}>
          <View style={{flexDirection:'row'}}>
            <Thumbnail square size={80} style={{marginBottom:10}} sty  />
            <View style={{flexDirection:'column', marginLeft:20}}>
            <Text>Name: <Text style={{fontWeight: '600', color: 'black',alignSelf:'center'}}>{room.name}</Text></Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.rowSeparator}/>
      </View>
      );
  }


  render(){
    return(
      <View style={styles.container}>
        <Header>
          <Title>List of rooms</Title>
        </Header>
      <ScrollView style={styles.scrollview}
      refreshControl={
        <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>{this._onRefresh()}}
        />}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
        </ScrollView>









    </View>
    );
  }
}




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
      isPlaying: false,
      synch: 0,
      time: 0,
      url: '',
      videoId: this.props.room.videoId,

    };


  }

  componentDidMount() {
    var initialId = this.returnVideoId('https://www.youtube.com/watch?v=titpi2PKQVg')
    this.setState({videoId:initialId})
    console.log(initialId)
    firebase.database().ref('rooms/' + this.props.name).on('value',(snap)=> {
      var state = snap.val();

      if (state.playing === 1) {
        this.setState({isPlaying: true})
      } else {
        this.setState({isPlaying: false})
      }
      if (state.synch > this.state.synch){
        this.state.synch = state.synch;
        if (this.refs.youtubePlayer)
          this.refs.youtubePlayer.seekTo(state.time);
        console.log('Synched')

      }

      if (state.videoId !== this.state.videoId){
        this.setState({videoId: state.videoId,isPlaying: false})
      }
    })

  }



  sendSignal(){

    console.log('inside send')
    if (this.state.isPlaying === true) {
      firebase.database().ref('rooms/' + this.props.name).set({name: this.props.name, synch: this.state.synch,time: this.state.time,playing: 0,videoId: this.state.videoId});
    } else {
      console.log('hi')
      firebase.database().ref('rooms/' + this.props.name).set({name: this.props.name, synch: this.state.synch,time: this.state.time,playing: 1,videoId: this.state.videoId});
    }
  }
  returnVideoId(url){
    var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    return id[1];
  }

  requestSynch(){


    firebase.database().ref('rooms/' + this.props.name).set({name: this.props.name, playing: 1, synch: this.state.synch + 1,time: this.state.time, videoId: this.state.videoId});
  }

  getVideo(){
    this.setState({videoId:this.returnVideoId(this.state.url)})
    firebase.database().ref('rooms/' + this.props.name).set({name: this.props.name,playing: 1,synch: 0,time: this.state.time, videoId: this.returnVideoId(this.state.url)});
  }
  _goBack(){
    this.props.navigator.pop();
  }
  render() {

    return (


     <View style={styles.container}>
     <Header >
     <Button transparent onPress={() => {this._goBack()}}>
                        <Icon name="ios-arrow-back" />
                    </Button>
     <Title>{this.props.name}</Title>

     </Header>
     <View >

     <Text >{this.state.status}</Text>
     <YouTube
     ref="youtubePlayer"
        videoId={this.state.videoId} // The YouTube video ID
        play={this.state.isPlaying}           // control playback of video with true/false
        hidden={false}        // control visiblity of the entire view
        playsInline={true}    // control whether the video should play inline
        loop={false}          // control whether the video should loop when ended
        controls={0}
        onReady={(e)=>{this.setState({isReady: true})}}
        onChangeState={(e)=>{this.setState({status: e.state})}}
        onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
        onError={(e)=>{this.setState({error: e.error})}}
        onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration});console.log(e.currentTime)}}

        style={styles.video}
        />
        </View>

        <TouchableHighlight style={styles.button}  underlayColor='transparent'
        onPress={()=>{this.sendSignal()}}>
        <View/>
        </TouchableHighlight>
        <View style={styles.synchButton} >
        <View style={{flex:1}}>
        <InputGroup borderType="underline" >
        <Icon name="ios-clock" style={{color:'#384850'}}/>
        <Input placeholder="Enter your desire time"
        onChangeText={(time) => this.setState({time})}
        value={this.state.time}
        />
        </InputGroup>
        </View>
        <View style={{flex:0.25}}>
        <Button bordered rounded block onPress={()=>{this.requestSynch()}}>
        <Text>Synch</Text>
        </Button>
        </View>
        </View>
        <View style={styles.synchButton} >
        <View style={{flex:1}}>
        <InputGroup borderType="underline" >
        <Icon name="ios-link" style={{color:'#384850'}}/>
        <Input placeholder="Enter the URLs of youtube video"
        onChangeText={(url) => this.setState({url})}
        value={this.state.url}
        />
        </InputGroup>
        </View>
        <View style={{flex:0.25}}>
        <Button bordered rounded danger block onPress={()=>{this.getVideo()}}>
        <Text>Get</Text>
        </Button>
        </View>
        </View>


        </View>

        );
  }
};



module.exports = Main;
