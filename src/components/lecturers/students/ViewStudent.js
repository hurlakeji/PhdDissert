import React, { Component } from 'react';
import {Text, View, ScrollView, ActivityIndicator, AsyncStorage, Image} from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button,  Left, Right, Body, Title, Picker, Fab, Card, CardItem, Thumbnail  } from 'native-base';
import {styles} from '../../../css/Styles';
import axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast';
import DialogProgress from 'react-native-dialog-progress';

const options = {
	title:"",
	message:"Please wait..",
	isCancelable:true
}

export class ViewStudent extends Component {

	static navigationOptions = {
	     header: null
	}
	  
	constructor(props) {
	    super(props);
		
		this.state = {
			student_id: props.navigation.state.params.student,
        	surname: '',
			firstname: '',
			middlename: '',
			matric: '',
			email: '',
			phone: '',
			gender: '',
	      	level: '',
			showToast: false,
			isLoaded: false,
		};

	}
    
    componentDidMount() {
        
        axios
        .get('http://192.168.43.144:8000/students/admin-edit-student/'+this.state.student_id) 
        .then( (response) => {
            this.setState({
                surname: response.data[0].surname,
                firstname: response.data[0].firstname,
                middlename: response.data[0].middlename,
                matric: response.data[0].matric,
                email: response.data[0].email,
                phone: response.data[0].phone,
                gender: response.data[0].gender,
                level: response.data[0].level,
                isLoaded:true
            });
        })
        .catch( (error) => {
            console.error(error);
        });
    }

	render() {

        let student_fullname = this.state.surname+" "+this.state.firstname+" "+this.state.middlename;

		return(
			<Container>
				<Header style={styles.tabColor}>
                    <Left style={{flex:1}}>
			            <Button transparent>
			              <Icon name='menu'/>
			            </Button>
			        </Left>
                    <Body style={{flex:1}}>
		            	<Title>Student's Profile</Title>
		          	</Body>
		          	<Right style={{flex:1}}>
		          		
			        </Right>
		        </Header>
				<Content>
				
					{!this.state.isLoaded ?
						
						<View style={styles.theLoading}>
							<ActivityIndicator size="large" />
						</View> :

						<ScrollView style={{marginBottom:30}}>
							<Body style={{flex: 1,marginTop:20,marginBottom:20}}>
								<Image source={require('../../../img/male_avatar.png')} style={{height: 200, width: 200}}/>
							</Body>
							<Card style={{flex: 1,marginLeft:10,marginRight:10}}>
								<CardItem>
									<Left>
										<Icon name="md-person" style={{fontSize:18,marginRight:10}}/>
										<Text style={{fontSize:18}}>{student_fullname} </Text>
									</Left>
								</CardItem>
								<CardItem>
								<Left>
									<Icon name="md-call" style={{fontSize:18,marginRight:10}}/>
									<Text style={{fontSize:18}}>{this.state.phone} </Text>
								</Left>
								</CardItem>
								<CardItem>
									<Left>
										<Icon name="md-mail" style={{fontSize:18,marginRight:10}}/>
										<Text style={{fontSize:18}}>{this.state.email} </Text>
									</Left>
								</CardItem>
                                <CardItem>
									<Left>
										<Icon name="md-key" style={{fontSize:18,marginRight:10}}/>
										<Text style={{fontSize:18}}>{this.state.matric} </Text>
									</Left>
								</CardItem>
                                <CardItem>
									<Left>
										<Icon name="md-person" style={{fontSize:18,marginRight:10}}/>
										<Text style={{fontSize:18}}>{this.state.gender} </Text>
									</Left>
								</CardItem>
                                <CardItem>
									<Left>
										<Icon name="md-information-circle" style={{fontSize:18,marginRight:10}}/>
										<Text style={{fontSize:18}}>{this.state.level}L</Text>
									</Left>
								</CardItem>
							</Card>
						</ScrollView>
					}

				</Content>
			</Container>	
		);
	}
}