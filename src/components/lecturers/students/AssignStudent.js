import React, { Component } from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button,  Left, Right, Body, Title, Picker, Fab } from 'native-base';
import {styles} from '../../../css/Styles';
import Toast, {DURATION} from 'react-native-easy-toast';
import RNPickerSelect from 'react-native-picker-select';

import firebase from "react-native-firebase";
const fs = firebase.firestore();
const store = firebase.storage();
const options = {
	title:"",
	message:"Please wait..",
	isCancelable:true
}
const placeholder = {
	label: 'Select a lecturer...',
	value: null,
  };
export class AssignStudent extends Component {

	static navigationOptions = {
	     header: null
	}
	
	constructor(props) {
	    super(props);
		this.state = {
			lecturerId: '',
			pickerArr:[],
			studentId: this.props.navigation.getParam('studentId', ''),
			showToast: false,
			isLoaded: false,
		};
		this.onLecturerChange = this.onLecturerChange.bind(this);
	}

	componentDidMount = () => {
	  this.fetch()
	}
	

	fetch(){
		var pickerArr = [];
		fs.collection('lecturers').get().then(value => {
			value.docs.forEach((val, index, arr) =>{
				var obj = {}
				var dataObj = val.data();
				obj["value"] = val.id;
				obj["label"] = dataObj.title+' '+dataObj.surname+' '+dataObj.firstname;
				pickerArr.push(obj);
				this.setState({pickerArr})
			})
		})
	}

	submit(){
		fs.collection('studentAssignments').add({
			studentId: this.state.studentId,
			lecturerId: this.state.lecturerId
		}).then(val => {
			this.refs.toast.show('Student assigned successfully!',DURATION.LENGTH_LONG);
			this.assignStudent();
		}).catch(() => {
			this.refs.toast.show('An error occured!',DURATION.LENGTH_LONG);
		})
	}
	
	onLecturerChange = (value) => {
		this.setState({
	      lecturerId: value
	    });
	}

	assignStudent = () => {
		setTimeout(
			() => {
				this.props.navigation.navigate('AllStudents', {updated:true});
			}
		, 1000);
	}

	render() {
		
		let dialog = null;
		
		return(
			<Container>
				
				<Header style={styles.tabColor}>
		          	<Left>
			            
			        </Left>
		          	<Body style={{flex:1}}>
		            	<Title>Assign Student</Title>
		          	</Body>
		          	<Right>
		          		
			        </Right>
		        </Header>

				<Content>
						<View style={{marginTop:20}}>
							<View style={styles.Inputs}>
								<Text style={styles.label}> Lecturer </Text>
								<Text style={styles.label}> {this.state.lecturerId} </Text>
								{
									this.state.pickerArr.length>0?(
										<RNPickerSelect
											placeholder={placeholder}
											items={this.state.pickerArr}
											onValueChange={this.onLecturerChange}
										/>
									):(
										<Text style={styles.label}>No Lecturer found </Text>
									)
								}
								
							</View>

							<Button full success style={styles.greenButtonWithBottom} onPress={() => this.submit()}>
								<Text style={{color:'#fff',fontSize:18}}><Icon name="md-checkmark-circle"/>  Assign</Text>
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
		    </Container>

		);
	}
}