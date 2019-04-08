import React, { Component } from 'react';
import {Text, View,ScrollView, Alert } from 'react-native';
import { Container, Content, Header, Icon, Button, Left, Right, Body, Title, Fab, List, ListItem, Thumbnail } from 'native-base';
import {styles} from '../../css/Styles';
import firebase from "react-native-firebase";
const fs = firebase.firestore();

export class StudentDashboard extends Component {

	static navigationOptions = {
	    header: null
	}
	
	constructor(props) {
		super(props);
		this.state={
			studentId: this.props.navigation.getParam('studentId', ''),
			student: this.props.navigation.getParam('student', {}),
			projects:[]
		}
	}

	componentDidMount = () => {
		fs.collection('projects').where('studentId', '==', this.state.studentId).get().then(res =>{
			var projects = [];
			res.docs.forEach((val, index, arr) => {
				projects.push(val.data());
			})
			this.setState({projects})
		})
	};
	

	
	render() {
		
		return (
	    	<Container>
				
				<Content>

					<Header style={styles.studentTabColor}>
			          	<Left>
				            
				        </Left>
			          	<Body style={{flex:1}}>
			            	<Title>My Write Ups</Title>
			          	</Body>
			          	<Right>
			          		
				        </Right>
			        </Header>

					<ScrollView>
						
						<View style={{marginBottom:5,marginLeft:20}}>
							<Text style={styles.smallHeadingText}> Hi, Olakeji Oshodi</Text>
						</View>
						
						<View style={{marginTop:0,marginLeft:20}}>
							<Text style={{marginTop:15, fontSize:15}}> Your dissertation supervisor is Dr ABC Robert</Text>
						</View>
							{
								this.state.projects.length>0?(
									<List
										dataArray={this.state.projects}
										renderRow={(data, IDK, index) => {
											<ListItem avatar>
												<Body>
													<Text style={styles.userName}>{data.name} </Text>
													<Text>Date</Text>
												</Body>
											</ListItem>
										}}
									/>
								):(null)
							}
					</ScrollView>
					<Fab
						direction="up"
						style={{ backgroundColor: '#932ab6' }}
						position="bottomRight"
						onPress={() => this.props.navigation.navigate('UploadProject', {studentId: this.state.studentId})}>
						<Icon name="md-cloud-upload"/>
					</Fab>
					
	      		</Content>
	  			
			</Container>
	    );
	}
}