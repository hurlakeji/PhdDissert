import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

  body: {
    fontFamily: 'Arial'
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 50,
    padding:16,
    backgroundColor:'white'
  },
  
  boldText: {
    fontSize: 30,
    color: 'red',
  },

  loading: {
		position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.6,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
	}, 

  theLoading: {
		left: 0,
    right: 0,
    top: 10,
    bottom: 10,
    opacity: 0.6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }, 

  box: {
    backgroundColor: 'green',
    fontSize: 20,
    textAlign: 'center'
  },

  container: {
    fontFamily: 'Arial',
    flex: 1,
    marginTop:80,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  the_container: {
    fontFamily: 'Arial',
    flex: 1,
    marginTop:120,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  loginPage: {
    flex: 1,
    marginTop:30,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  loginText: {
    marginTop:10,
    fontSize:25,
    color: '#5B39C6',
    textAlign: 'center',
    flex:1,
    marginBottom:30
  },

  studentLoginText: {
    marginTop:10,
    fontSize:25,
    color: '#0073b7',
    textAlign: 'center',
    flex:1,
    marginBottom:30
  },

  appTitle: {
  	marginTop:40,
  	fontSize:25,
  	color: '#5B39C6',
  	textAlign: 'center',
  	flex:1,
  	marginBottom:60
  },

  courseHeading: {
    fontSize:18,
    marginBottom:15,
    fontWeight:'bold'
  },

  loginHeader: {
    flex:1,
    fontSize:25,
    alignItems:'center'
  }, 

  theHeader : {
    backgroundColor: '#5EBA7D'
  }, 

  tabColor: {
    backgroundColor:'#5B39C6',
  },

  studentTabColor: {
    backgroundColor:'#0073b7',
  },

  footer: {
    marginTop:10
  },

  footerTab: {
    backgroundColor:'#5B39C6'
  }, 

  tabText: {
    color:'#fff', 
    marginLeft:10, 
    fontSize:18
  }, 

  whiteColor: {
    color:'#fff'
  }, 

  blackColor: {
    color:'#000'
  }, 

  Inputs: {
    marginLeft:30,
    marginBottom:10,
    marginRight:20
  },

  theInputs: {
    marginLeft:30,
    marginBottom:20,
    marginRight:20
  },

  label: {
    fontSize: 14,
    color: '#444',
    marginTop:10,
    marginBottom:5
  }, 

  theLabel: {
    fontSize: 14,
    color: '#444',
    marginBottom:-20
  }, 

  buttonWithoutBottom: {
    marginLeft:30,
    marginBottom:10,
    marginRight:20,
    marginTop: 20
  }, 

  greenButtonWithoutBottom: {
    backgroundColor:'#5B39C6',
    marginLeft:30,
    marginBottom:10,
    marginRight:20,
    marginTop: 20
  }, 

  selectFile: {
    backgroundColor:'#fff',
    borderStyle: 'solid',
    borderColor: '#ccc',
    color:'#000',
    borderWidth: 1,
    marginLeft:30,
    marginBottom:10,
    marginRight:20,
    marginTop: 20
  }, 

  selectDate: {
    backgroundColor:'#fff',
    borderStyle: 'solid',
    borderColor: '#ccc',
    color:'#000',
    borderWidth: 1,
    marginBottom:10,
    marginRight:20,
    marginTop: 20
  }, 

  buttonWithBottom: {
    marginLeft:30,
    marginBottom:70,
    marginRight:20
  },

  homeLectButton: {
    backgroundColor:'#5B39C6',
    marginLeft:13, 
    padding:10
  },

  greenButtonWithBottom: {
    backgroundColor:'#5B39C6',
    marginLeft:30,
    marginBottom:70,
    marginRight:20
  },

  buttonWithTopBottom: {
    marginLeft:30,
    marginTop:20,
    marginBottom:70,
    marginRight:20
  }, 

  greenButtonWithTopBottom: {
    backgroundColor:'#5B39C6',
    marginLeft:30,
    marginTop:20,
    marginBottom:70,
    marginRight:20
  }, 

  Image: {
    width:150, 
    height:150
  }, 

  textDetails: {
    textAlign:'center', 
    color:'#444',
    fontSize:16
  }, 

  buttonText: {
    color:'#fff',
    fontSize:18
  },

  userName: {
    fontSize:20,
    marginBottom:5
  },

  lectName: {
    fontSize:18,
    marginBottom:5
  },

  primaryText: {
    color: '#3F51B5'
  },

  infoText: {
    color: '#62B1F6'
  }, 

  successText: {
    color: '#5B39C6'
  },

  dangerText: {
    color: '#D9534F'
  },

  theDangerText: {
    color: '#D9534F',
    textAlign: 'center',
    marginTop: 150,
    marginBottom:100,
    fontSize: 40
  },

  theLoading: {
    textAlign: 'center',
    marginTop: 150,
    marginBottom:100,
    fontSize:50
  },

  waitingText: {
    textAlign: 'center',
    fontSize: 30
  },

  warningText: {
    color: '#F0AD4E'
  },

  bgGray: {
    backgroundColor: '#eaeaec'
  },

  bgBlack: {
    backgroundColor: '#222'
  },

  bgRed: {
    backgroundColor: '#f56954'
  },

  bgYellow: {
    backgroundColor: '#f39c12'
  },

  bgAqua: {
    backgroundColor: '#00c0ef'
  },

  bgBlue: {
    backgroundColor: '#0073b7'
  },

  bgLightBlue: {
    backgroundColor: '#3c8dbc'
  },

  bgGreen: {
    backgroundColor: '#00a65a',
    margin: 10,
    padding:35,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 10,
    flex:1,
    width:'170%'
  },

  bgNavy: {
    backgroundColor: '#001f3f',
    margin: 10,
    padding:30,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 10,
    width:'95%',
  },

  bgTeal: {
    backgroundColor: 'brown',
    margin: 10,
    padding:30,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 10,
    width:'95%'
  },

  bgOlive: {
    backgroundColor: '#3d9970',
    margin: 10,
    padding:33,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 10,
    width:'95%'
  },

  bgLime: {
    backgroundColor: '#01ff70',
    margin: 10,
    padding:30,
    borderStyle: 'solid',
    borderColor: '#fff'
  },

  bgOrange: {
    backgroundColor: '#ff851b',
    margin: 10,
    padding:30,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 10
  },

  bgBlu: {
    backgroundColor: '#0073b7',
    margin: 10,
    padding:27,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 10,
    flex:1,
    width:'100%',
    height:150
  },

  bgPurple: {
    backgroundColor: '#932ab6',
    margin: 10,
    padding:30,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 10,
    width:'95%',
    borderRadius:20,
  },

  boxText: {
    color: '#fff',
    fontSize:30
  }, 

  headingText: {
    color: '#000',
    fontSize:30
  }, 

  smallHeadingText: {
    color: '#000',
    fontSize:25
  }, 

  smallText: {
    color: '#fff',
    fontSize:25
  }, 

  theSmallText: {
    color: '#fff',
    fontSize:20
  }, 

  theMediumText: {
    color: '#fff',
    fontSize:22
  }, 

  theSmallestText: {
    color: '#fff',
    fontSize:18
  }, 

  bgNum: {
    fontSize:20, 
    backgroundColor:'#5B39C6',
    color: '#fff',
    borderRadius:40,
    fontWeight:'bold',
    padding:10
  },

  bgBlueNum: {
    fontSize:20, 
    backgroundColor:'#0073b7',
    color: '#fff',
    borderRadius:40,
    padding:10
  },

  bgTealNum: {
    fontSize:20, 
    backgroundColor:'#3D9970',
    color: '#fff',
    borderRadius:40,
    padding:10
  },

  bgMaroon: {
    backgroundColor: '#85144b',
    margin: 10,
    padding:30,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 10,
    width:'95%'
  },

  bgBrown: {
    backgroundColor: 'brown',
    margin: 10,
    padding:30,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 10,
    width:'95%', 
  }

});