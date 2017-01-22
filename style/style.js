'use strict';

import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
var windowSize = Dimensions.get('window');
module.exports  = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    
    title: {
      color: 'black',
      fontWeight: '600',
      fontSize: 50,
      alignSelf: 'center',
      fontFamily: 'Academy Engraved LET',
      paddingTop: 110,
      // fontStyle: 'italic'
    },
   
    button: {
      flex:1,
      left:0,
      bottom: 280,
      alignSelf: 'center',
      alignItems: 'center',
      height: 300,
      backgroundColor: 'transparent',
      width: windowSize.width,
      position: 'absolute'

    },
    video: {
      alignSelf: 'stretch',
      height: 300,
      backgroundColor: 'black',
      marginVertical: 10
    },
    synchButton: {
      width: windowSize.width,
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    containerTop: {
    flex: 1,
    flexDirection: 'row', 
    marginTop: 5,
    backgroundColor: 'transparent',
    marginLeft: 0,
  },
  cardView: {
    flexDirection: 'row',
    flex: 1,
    height: 110,
  },
  header : {
    marginLeft: -5,
    marginTop: 5,
    marginBottom: (Platform.OS==='ios') ? -7 : 0,
    lineHeight: 24,
    color: '#5357b6'
  },
  modalImage: {
    resizeMode: 'contain',
    height: 200,
    width:200,
    alignSelf: 'center'
  },
  bold: {
    fontWeight: '600'
  },
  negativeMargin: {

    marginTop: 10,
  },

  buttons:{
    flexDirection: 'row',
    marginTop: 50,
  },

  rowSeparator: {
    backgroundColor: '#009933',
    height:1,
    width: windowSize.width
  },
  row: {
    height:100,
  },
  scrollview:{
    height: 600,
  },
  whiteFont: {
      color: 'grey',
       fontWeight: '600',
      fontSize: 20,
      alignSelf: 'center',
      fontFamily: 'Academy Engraved LET',
      paddingTop: 110,

  },
  createRoom: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 150,
    marginTop: 20
  }

})
