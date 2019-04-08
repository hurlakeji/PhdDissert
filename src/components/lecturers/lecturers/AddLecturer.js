import React, { Component } from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button,  Left, Right, Body, Title, Picker, Fab  } from 'native-base';
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

export class AddLecturer extends Component {

	static navigationOptions = {
	     header: null
	}
	
	constructor(props) {
	    super(props);
		
		this.state = {
			surname: '',
			firstname: '',
			middlename: '',
			email: '',
			phone: '',
			title: '',
			role: '',
			showToast: false,
			loading: false,
		};

		this.onRoleChange = this.onRoleChange.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
	
	}

	submit(){
		var s = this.state;
		var val = {
			title: s.title,
			surname: s.surname,
			firstname: s.firstname,
			middlename: s.middlename,
			email: s.email,
			phone: s.phone,
			role: s.role
		}
		auth.createUserWithEmailAndPassword(val.email, s.surname.charAt(0)+s.firstname).then(res =>{
			fs.collection('lecturers').add(val).then(value =>{
				this.addLecturer()
			}).catch(() =>{
				this.refs.toast.show('An error occured. Please try again',DURATION.LENGTH_LONG);
			})
		}).catch(err => {
			this.refs.toast.show(err.message,DURATION.LENGTH_LONG);
		})
	}
	
	resetForm = () => {
		this.setState({
			surname: '',
			firstname: '',
			middlename: '',
			email: '',
			phone: '',
			title: '',
			role: ''
		});
	}

	onTitleChange = (value) => {
	    this.setState({
	      	title: value
	    });
	}

	onRoleChange = (value) => {
	    this.setState({
	      	role: value
	    });
	}

	addLecturer = () => {
		this.refs.toast.show('Lecturer details was successfully added.',DURATION.LENGTH_LONG);
		setTimeout(
			() => {
				this.props.navigation.navigate('AllLecturers', {updated:true});
			}
		, 100);
	}
	
	render() {
		return(
			<Container>
				<Header style={styles.tabColor}>
		          	<Left style={{flex:1}}>
			            <Button transparent>
			              <Icon name='menu'/>
			            </Button>
			        </Left>
		          	<Body style={{flex:1}}>
		            	<Title>Add Lecturer</Title>
		          	</Body>
		          	<Right style={{flex:1}}>
		          		
			        </Right>
		        </Header>

				<Content>
					<View style={{marginTop:20}}>
						<View style={styles.Inputs}>
			         		<Text style={styles.label}> Title </Text>
			         		<Picker
					            mode="dropdown"
					            iosHeader="Select title"
					            iosIcon={<Icon name="ios-arrow-down-outline" />}
					            style={{ width: undefined }}
					            selectedValue={this.state.title}
					            onValueChange={this.onTitleChange.bind(this)}
					        >
				              <Picker.Item label="--Select Title --" value=""/>
				              <Picker.Item label="Mr." value="Mr."/>
				              <Picker.Item label="Miss" value="Miss"/>
				              <Picker.Item label="Mrs." value="Mrs."/>
				              <Picker.Item label="Dr." value="Dr."/>
				              <Picker.Item label="Dr. Mrs" value="Dr. Mrs"/>
				              <Picker.Item label="Dr. Miss" value="Dr. Miss"/>
				              <Picker.Item label="Prof." value="Prof."/>
				            </Picker>
				        </View>
						
						<Item style={styles.Inputs}>
			         		<Input placeholder='Surname' onChangeText={ (text) => this.setState({surname: text})} value={this.state.surname}/>
			         	</Item>

			         	<Item style={styles.Inputs}>
			         		<Input placeholder='Firstname' onChangeText={ (text) => this.setState({firstname: text})} value={this.state.firstname}/>
			         	</Item>

			         	<Item style={styles.Inputs}>
			         		<Input placeholder='Middlename' onChangeText={ (text) => this.setState({middlename: text})} value={this.state.middlename}/>
			         	</Item>

			         	<Item style={styles.Inputs}>
			         		<Input placeholder='Email address' onChangeText={ (text) => this.setState({email: text})} value={this.state.email}/>
			         	</Item>

			         	<Item style={styles.Inputs}>
			         		<Input placeholder='Phone number' onChangeText={ (text) => this.setState({phone: text})} value={this.state.phone}/>
			         	</Item>

			         	<View style={styles.Inputs}>
			         		<Text style={styles.label}> Role </Text>
			         		<Picker
					            mode="dropdown"
					            iosHeader="Select role"
					            iosIcon={<Icon name="ios-arrow-down-outline" />}
					            style={{ width: undefined }}
					            selectedValue={this.state.role}
					            onValueChange={this.onRoleChange.bind(this)}
					        >
				              <Picker.Item label="--Select Role --" value=""/>
				              <Picker.Item label="Lecturer" value="lecturer"/>
				              <Picker.Item label="Admin" value="admin"/>
				            </Picker>
				        </View>

				        <Button full success style={styles.greenButtonWithBottom} onPress={() => this.submit()}>
							<Text style={{color:'#fff',fontSize:18}}><Icon name="md-add-circle"/>  Add Lecturer</Text>
						</Button>
						{this.state.loading &&
							<View style={styles.loading}>
							<ActivityIndicator size='large' />
							</View>
						}

						<Toast
							ref="toast"
							style={{backgroundColor:'black'}}
							position='bottom'
							positionValue={140}
							fadeInDuration={200}
							fadeOutDuration={3000}
							opacity={0.8}
							textStyle={{color:'white'}}
						/>
						
						<Fab
							active="true"
							direction="up"
							style={{ backgroundColor: '#075E54' }}
							position="bottomRight"
							onPress={() => this.props.navigation.navigate('AllLecturers')}>
							<Icon name="md-person"/>
						</Fab>
					</View>
					
		        </Content>
		    </Container>
		);
	}
	navigate(route){
		this.props.navigation.navigate(route)
	}
}