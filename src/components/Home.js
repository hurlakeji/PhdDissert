import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { Container, Header, Content, Spinner, Item, Input, Icon, Body, Table, Left, Right, Title, Button  } from 'native-base';
import {styles} from '../css/Styles';

export class Home extends Component {

	static navigationOptions = {
	      header: null
	}
	  
	render() {
		return(
			<Container style={styles.body}>
				<Content>
		          <View 
		            style={styles.the_container}>
		            <Image 
									source ={require('../img/logo.png')
									} 
		            />
		            <Text 
		              style={styles.appTitle}> Postgraduate(PhD) Dissertation Progress Monitoring System
		            </Text>
		          </View>

		          <View 
		            style={{flexDirection: 'row'}}>
		            <Button full iconLeft 
		              style={{marginLeft:30, padding:10}} 
		              onPress = {() => this.props.navigation.navigate('StudentLogin')}>
		              <Text 
		                style={{color:'white', fontSize:20, padding:10}}> Student 
		              </Text>
		            </Button>
							
		            <Button full iconLeft success 
		              style={styles.homeLectButton} 
		              onPress={() => this.props.navigation.navigate('LecturerLogin')}>
		              <Text style={{color:'white', fontSize:20, paddingLeft:10}}> Supervisor </Text>
		            </Button>

								<Button full iconLeft success 
		              style={styles.homeLectButton} 
		              onPress={() => this.props.navigation.navigate('AdminDashboard')}>
		              <Text style={{color:'white', fontSize:20, paddingLeft:10}}> Admin </Text>
		            </Button>
		          </View>

		        </Content>
		    </Container>
		);
	}
}