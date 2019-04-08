import React, { Component } from 'react';
import {Text, Alert, View, ActivityIndicator,ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Icon, Button, Left, Right, Body, Title, Fab, List, ListItem, Thumbnail } from 'native-base';
import {styles} from '../../../css/Styles';
import OptionsMenu from "react-native-options-menu";
import firebase from "react-native-firebase";
const fs = firebase.firestore();
const auth = firebase.auth();

const myIcon = (<Icon name='create' style={{fontSize:23,color:'#555'}}/>);

export class MyProjectStudents extends Component {

	static navigationOptions = {
	    header: null
	}
	  
	constructor(props) {
	    super(props);
	    
		this.state = {
			isLoaded: false
		};
		
	}

	viewItem = (id) => {
		this.props.navigation.navigate('ViewProjects', {studentId: id});
	}

	
	render() {
		
		return(

			<Container>
				
				<Header style={styles.tabColor}>
		          	<Left>
			            
			        </Left>
		          	<Body style={{flex:1}}>
		            	<Title>My Project Students</Title>
		          	</Body>
		          	
		        </Header>
				
				<ScrollView>
					<List>
						<ListItem avatar>
							<Left>
								<Thumbnail source={require('../../../img/avatar.png')} />
							</Left>
							<Body>
								<TouchableOpacity onPress={() => this.viewItem()}>
									<Text style={styles.userName}>Olakeji Oshodi </Text>
									<Text>192890    700L   0812345678</Text>
								</TouchableOpacity>
							</Body>
						
						</ListItem>	

						<ListItem avatar>
							<Left>
								<Thumbnail source={require('../../../img/avatar.png')} />
							</Left>
							<Body>
								<TouchableOpacity onPress={() => this.viewItem()}>
									<Text style={styles.userName}>Dominic Cletus</Text>
									<Text>192894    700L   0812045678</Text>
								</TouchableOpacity>
							</Body>
						
						</ListItem>	

						<ListItem avatar>
							<Left>
								<Thumbnail source={require('../../../img/avatar.png')} />
							</Left>
							<Body>
								<TouchableOpacity onPress={() => this.viewItem()}>
									<Text style={styles.userName}>Oyeyemi Dare</Text>
									<Text>172894    600L   0802045678</Text>
								</TouchableOpacity>
							</Body>
						
						</ListItem>	

						<ListItem avatar>
							<Left>
								<Thumbnail source={require('../../../img/avatar.png')} />
							</Left>
							<Body>
								<TouchableOpacity onPress={() => this.viewItem()}>
									<Text style={styles.userName}>Fredrick Matthew</Text>
									<Text>172895    700L   0802005678</Text>
								</TouchableOpacity>
							</Body>
						</ListItem>	
						
					</List>
				</ScrollView>

			</Container>
		);
	}
}