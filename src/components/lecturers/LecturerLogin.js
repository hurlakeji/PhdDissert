import React, { Component } from 'react';
import { Text, View, Image, ActivityIndicator,AsyncStorage } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button, Picker } from 'native-base';
import {styles} from '../../css/Styles';
import axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast';
import PasswordInputText from 'react-native-hide-show-password-input';
import DialogProgress from 'react-native-dialog-progress';
import firebase from "react-native-firebase";
const fs = firebase.firestore();
const auth = firebase.auth();

const options = {
	title:"",
	message:"Verifying Login Details..",
	isCancelable:true
}

export class LecturerLogin extends Component {

	static navigationOptions = {
	     header: null
	}
	  
	constructor(props) {
	    super(props);
	    this.state = {
			logged_out: '',
			password_changed: '',
			email: '',
			password: '',
			lecturer_id: '',
			showToast: false,
			loading: false,
			isLoggedIn: true,
			isPasswordChanged: true,
			isLoggedOut: true	    
		};
	}

	submit(){
		var s = this.state;
		auth.signInWithEmailAndPassword(s.email, s.password).then(res =>{
			this.loginLecturer(res.user.uid)
		}).catch(err =>{
			this.refs.toast.show('An error occured:'+err.message, DURATION.LENGTH_LONG);
		})
	}
	
	resetForm = () => {
		this.setState({
			email: '',
			password: ''
	    });
	}
	
	validateForm = (email,password) => {
		
		if(email == "" || password == "") {
			return 1;
		} else {
			return 0;
		}
	}

	loginLecturer = (id) => {
		setTimeout(
			() => {
				this.props.navigation.navigate('LecturerDashboard', {uid: id});
			}
		, 100);
	}
	
	render() {
	

		return(
			<Container>
				
					<Content>
						
						<View>
						
							<View 
								style={styles.the_container}>
								<Image 
								source ={require('../../img/logo.png')} 
								/>
								<Text 
								style={styles.loginText}>Supervisor Login 
								</Text>

							</View>

							<View style={{marginTop:20}}>

								<Item style={styles.Inputs}>
									{/* <Icon name='md-mail'/> */}
									<Input placeholder='Email address' onChangeText = { (text) => this.setState({email: text}) } value={this.state.email}/>
								</Item>
								
								<View style={styles.Inputs}>
									<PasswordInputText
										value={this.state.password}
										onChangeText={ (password) => this.setState({ password }) }
									/>
								</View>

								<Button full success style={styles.greenButtonWithoutBottom} onPress={() => this.loginLecturer()}>
									<Text style={{color:'#fff',fontSize:18}}>Login </Text>
								</Button>
								
								<Toast
									ref="toast"
									style={{backgroundColor:'black'}}
									position='bottom'
									positionValue={500}
									fadeInDuration={200}
									fadeOutDuration={3000}
									opacity={0.8}
									textStyle={{color:'white'}}
								/>
							</View>
						</View>
					</Content> 
		    </Container>
		);
	}
}