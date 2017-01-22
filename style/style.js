'use strict';

import {
  StyleSheet,
  Dimensions,

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
    }

})
