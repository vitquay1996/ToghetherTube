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
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 110,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    },
    circles: {
    	flexDirection: 'row',
    	alignItems: 'center',
    },
    progress: {
    	margin: 10,
    },
    title: {
      color: '#FFF',
      fontWeight: '600',
      fontSize: 50,
      alignSelf: 'center',
      fontFamily: 'Academy Engraved LET',
      paddingTop: 110,
      // fontStyle: 'italic'
    },
    subtitle: {
      color: '#FFF',
      fontWeight: '600',
      fontSize: 25,
      alignSelf: 'center',
      fontFamily: 'Academy Engraved LET',
      paddingTop: 40,
      // fontStyle: 'italic'
    },
    button: {
      flex:1,
      left:0,
      bottom: 175,
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
