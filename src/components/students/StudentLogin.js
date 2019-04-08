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
	message:"Verifying Login Details.. ",
	isCancelable:true
}
export class StudentLogin extends Component {

	static navigationOptions = {
	     header: null
	}
	  
	constructor(props) {
	    super(props);
	    this.state = {
	      	matric: '',
			password: '',
			student_id: '',
			showToast: false,
			loading: false,
			isLoggedIn: true,
	    };
	}

	resetForm = () => {
		this.setState({
			matric: '',
			password: ''
	    });
	}

	submit(){
		var s = this.state;
		auth.signInWithEmailAndPassword(s.email, s.password).then(res =>{
			this.loginStudent(res.user.uid)
		}).catch(err =>{
			this.refs.toast.show('An error occured:'+err.message, DURATION.LENGTH_LONG);
		})
	}
	
	validateForm = (matric,password) => {
		
		if(matric == "" || password == "") {
			return 1;
		} else {
			return 0;
		}
	}

	loginStudent = (id) => {
		this.refs.toast.show('Login successful', DURATION.LENGTH_LONG);
		setTimeout(
			() => {
				this.props.navigation.navigate('StudentDashboard', {studentId: id});
			}
		, 1000);
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
								style={styles.studentLoginText}>Student Login 
								</Text>
							
							</View>

							<View style={{marginTop:20}}>
								
								<Item style={styles.Inputs}>
									<Input placeholder='username' keyboardType='text' maxLength={30}   onChangeText = { (text) => this.setState({matric: text}) } value={this.state.matric} />
								</Item>
								
								<View style={styles.Inputs}>
									<PasswordInputText
										value={this.state.password}
										onChangeText={ (password) => this.setState({ password }) }
									/>
								</View>
								
								{/* <Item style={styles.Inputs}>
									<Icon name='md-key'/>
									<Input placeholder='Password' onChangeText = { (text) => this.setState({password: text}) } value={this.state.password} secureTextEntry={true}/>
								</Item> */}

								<Button full primary style={styles.buttonWithoutBottom} onPress={() => this.submit()}>
									<Text style={{color:'#fff',fontSize:18}}>Login <Icon name='log-in'/></Text>
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