import React, { Component } from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button,  Left, Right, Body, Title, Picker, Fab } from 'native-base';
import {styles} from '../../../css/Styles';
import axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast';
import DialogProgress from 'react-native-dialog-progress';
import firebase from "react-native-firebase";
const fs = firebase.firestore();
const auth = firebase.auth();
const options = {
	title:"",
	message:"Please wait..",
	isCancelable:true
}

export class AddStudent extends Component {

	static navigationOptions = {
	     header: null
	}
	
	constructor(props) {
	    super(props);
	    
		this.state = {
			surname: '',
			firstname: '',
			middlename: '',
			matric: '',
			email: '',
			phone: '',
			gender: '',
	      	level: '',
			showToast: false,
			loading: false,
		};

		this.onGenderChange = this.onGenderChange.bind(this);
		this.onLevelChange = this.onLevelChange.bind(this);
	}
	
	submit(){
		var s = this.state;
		var val = {
			surname: s.surname,
			firstname: s.firstname,
			middlename: s.middlename,
			matric: s.matric,
			email: s.email,
			phone: s.phone,
			gender: s.gender,
			level: s.level
		}
		auth.createUserWithEmailAndPassword(s.email, s.surname.charAt(0)+s.firstname+s.matric.substr(2,3)).then(res =>{
			fs.collection('students').add(val).then(res => {
				this.addStudent();
			}).catch(() =>{
				this.refs.toast.show('An error occured. Please try again.',DURATION.LENGTH_LONG);
			})
		}).catch(err =>{
			this.refs.toast.show(err.message,DURATION.LENGTH_LONG);
		})
	}
	
	resetForm = () => {
		this.setState({
			surname: '',
			firstname: '',
			middlename: '',
			matric: '',
			email: '',
			phone: '',
			gender: '',
	      	level: ''
	    });
	}

	onGenderChange = (value) => {
	    this.setState({
	      gender: value
	    });
	}

	onLevelChange = (value) => {
		this.setState({
	      level: value
	    });
	}

	addStudent = () => {
		this.refs.toast.show('Student details was successfully added.',DURATION.LENGTH_LONG);
			setTimeout(
				() => {
					this.props.navigation.navigate('AllStudents', {updated:true});
				}
			, 100);
	}

	render() {
		
		let dialog = null;
		
		return(
			<Container>
				
				<Header style={styles.tabColor}>
		          	<Left style={{flex:1}}>
			            
			        </Left>
		          	<Body style={{flex:1}}>
		            	<Title>Add New Student</Title>
		          	</Body>
		          	<Right style={{flex:1}}>
		          		
			        </Right>
		        </Header>

				<Content>
					
					<View style={{marginTop:20}}>
						<Item style={styles.Inputs}>
							<Input placeholder='Surname' onChangeText={ (text) => this.setState({surname: text})} value={this.state.surname}/>
						</Item>

						<Toast
							ref="toast"
							style={{backgroundColor:'black'}}
							position='bottom'
							positionValue={80}
							fadeInDuration={200}
							fadeOutDuration={3000}
							opacity={0.8}
							textStyle={{color:'white'}}
						/>

						{dialog}
							
						<Item style={styles.Inputs}>
							<Input placeholder='Firstname' onChangeText={ (text) => this.setState({firstname: text})} value={this.state.firstname}/>
						</Item>

						<Item style={styles.Inputs}>
							<Input placeholder='Matric No' keyboardType='numeric' maxLength={6}  onChangeText={ (text) => this.setState({matric: text})} value={this.state.matric}/>
						</Item>

						<Item style={styles.Inputs}>
							<Input placeholder='Email address' onChangeText={ (text) => this.setState({email: text})} value={this.state.email}/>
						</Item>

						<Item style={styles.Inputs}>
							<Input placeholder='Phone number' onChangeText={ (text) => this.setState({phone: text})} value={this.state.phone}/>
						</Item>

						<View style={styles.Inputs}>
							<Text style={styles.label}> Gender </Text>
							<Picker
								mode="dropdown"
								iosHeader="Select gender"
								iosIcon={<Icon name="ios-arrow-down-outline" />}
								style={{ width: undefined }}
								selectedValue={this.state.gender}
								onValueChange={this.onGenderChange}
							>
							<Picker.Item label="--Select Gender --" value=""/>
							<Picker.Item label="Male" value="male"/>
							<Picker.Item label="Female" value="female"/>
							</Picker>
						</View>

						<View style={styles.Inputs}>
							<Text style={styles.label}> Level </Text>
							<Picker
								mode="dropdown"
								iosHeader="Select level"
								iosIcon={<Icon name="ios-arrow-down-outline" />}
								style={{ width: undefined }}
								selectedValue={this.state.level}
								onValueChange={this.onLevelChange}
							>
							<Picker.Item label="--Select Level --" value=""/>
							<Picker.Item label="100L" value="100"/>
							<Picker.Item label="200L" value="200"/>
							<Picker.Item label="300L" value="300"/>
							<Picker.Item label="400L" value="400"/>
							<Picker.Item label="700L" value="700"/>
							</Picker>
						</View>

						<Button full success style={styles.greenButtonWithBottom} onPress={() => this.submit()}>
							<Text style={{color:'#fff',fontSize:18}}><Icon name="md-add-circle"/>  Add Student</Text>
						</Button>
					</View>
		        </Content>
				<Fab
					direction="up"
					style={{ backgroundColor: '#932ab6' }}
					position="bottomRight"
					onPress={() => this.props.navigation.navigate('AllStudents')}>
					<Icon name="md-person"/>
				</Fab>
		    </Container>

		);
	}
	navigate(route){
		this.props.navigation.navigate(route)
	}
}