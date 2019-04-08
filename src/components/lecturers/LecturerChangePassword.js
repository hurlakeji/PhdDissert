import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Text, View, Image, ActivityIndicator, AsyncStorage } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button } from 'native-base';
import {styles} from '../../css/Styles';
import axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast';

export class LecturerChangePassword extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
			lecturer_id:'',
			new_password: '',
	      	confirm_password: '',
			showToast: false,
			loading: false
	    };
	}
	
	static navigationOptions = {
	    header: null
	}
	
	resetForm = () => {
		this.setState({
			new_password: '',
	      	confirm_password: ''
		});
	}
	
	showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }

	componentDidMount() {
		
		AsyncStorage
			.getItem('the_lecturer_reset_id')
			.then( (value) => {
				
				this.setState({
					lecturer_id: value
				});
			});
	}
	
	changePassword = () => {
		let new_password = this.state.new_password;
		let confirm_password = this.state.confirm_password;
		
		if(new_password == "" || confirm_password == "") {
			this.refs.toast.show('Invalid passwords.',DURATION.LENGTH_LONG);
			return false;
		} else {
			this.showLoading();
		
			let data = JSON.stringify({
				new_password: new_password,
				confirm_password: confirm_password
			});

			axios({
				method: 'post',
				data: data,
				url: 'http://192.168.43.144:8000/lecturers/change-reset-password/'+this.state.lecturer_id,
			}).then(response => {
				
				if(response.status == 200) {
					if(response.data == "empty") {
						this.refs.toast.show('Invalid passwords. Try again.',DURATION.LENGTH_LONG);
					} else if(response.data == "not_match") {
						this.refs.toast.show('Passwords does not match. Try again.',DURATION.LENGTH_LONG);
					} else {
						AsyncStorage.removeItem('lecturer_reset_id');
						AsyncStorage.removeItem('the_lecturer_reset_id');
						AsyncStorage.setItem('lecturer',JSON.stringify(response.data));
						this.resetForm();
						this.props.navigation.navigate('LecturerDashboard');
					}
					this.hideLoading();
				} else {
					this.refs.toast.show('Invalixd request. Try again.',DURATION.LENGTH_LONG);
				}
			}).
			catch( (error) => {
				this.refs.toast.show('Invalid request. Try again.',DURATION.LENGTH_LONG);
			});
		}
	}

	render() {
		return(
			<Container>
				<Content>
					
					<View 
		            	style={styles.the_container}>
			            <Image 
			              source ={require('../../img/logo.png')} 
			              />
			            <Text 
			              style={styles.loginText}>Change Password
			            </Text>
			        </View>

			        <Item style={styles.Inputs}>
						<Icon active name='md-key'/>
						<Input placeholder='Enter new password' secureTextEntry={true} onChangeText = { (text) => this.setState({new_password: text}) } value={this.state.new_password}/>
					</Item>

					<Item style={styles.Inputs}>
						<Icon active name='md-key'/>
						<Input placeholder='Confirm password' secureTextEntry={true} onChangeText = { (text) => this.setState({confirm_password: text}) } value={this.state.confirm_password}/>
					</Item>

		         	<Button full success style={styles.greenButtonWithBottom} onPress={() => this.changePassword()}>
		         		<Icon name='md-checkmark'/>
    					<Text style={{color:'#fff',fontSize:18}}> Change Password </Text>
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
						positionValue={300}
						fadeInDuration={200}
						fadeOutDuration={3000}
						opacity={0.8}
						textStyle={{color:'white'}}
					/>
			
		        </Content>
		    </Container>
		);
	}
}