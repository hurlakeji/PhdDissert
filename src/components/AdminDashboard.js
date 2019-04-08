import React, { Component } from 'react';
import { Text, View, Image, ActivityIndicator,AsyncStorage } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button, Picker } from 'native-base';
import {styles} from '../css/Styles';
import axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast';
import PasswordInputText from 'react-native-hide-show-password-input';
import DialogProgress from 'react-native-dialog-progress';

const options = {
	title:"",
	message:"Verifying Login Details..",
	isCancelable:true
}

export class AdminDashboard extends Component {

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
	
	resetForm = () => {
		this.setState({
			username: '',
			password: ''
	    });
	}
	
	validateForm = (username,password) => {
		
		if(username == "" || password == "") {
			return 1;
		} else {
			return 0;
		}
	}

	loginLecturer = () => {
		setTimeout(
			() => {
				this.props.navigation.navigate('AdminAdd');
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
								source ={require('../img/logo.png')} 
								/>
								<Text 
								style={styles.loginText}>Admin Login 
								</Text>

							</View>

							<View style={{marginTop:20}}>

								<Item style={styles.Inputs}>
									{/* <Icon name='md-mail'/> */}
									<Input placeholder='username' onChangeText = { (text) => this.setState({email: text}) } value={this.state.email}/>
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