import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button, Tab, Tabs, TabHeading, ScrollableTab, Left, Right, Body, Title } from 'native-base';
import { AddStudent } from './AddStudent';
import { AllStudents } from './AllStudents';
import {styles} from '../../../css/Styles';

export class AllTheStudents extends Component {

	static navigationOptions = {
	    header: null
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
		            	<Title>Students</Title>
		          	</Body>
		          	<Right style={{flex:1}}>
		          		<Button transparent>
			              <Icon name='search' />
			            </Button>
			        </Right>
		        </Header>

				<Tabs 
					renderTabBar={()=> <ScrollableTab style={styles.tabColor}/>}>
		          	
		          	<Tab heading={ <TabHeading style={styles.tabColor}><Icon name="md-person-add" style={styles.whiteColor}/><Text style={styles.tabText}>Add Student</Text></TabHeading>}>
			            <AddStudent/>

			        </Tab>

		          	<Tab heading={ <TabHeading style={styles.tabColor}><Icon name="md-people" style={styles.whiteColor}/><Text style={styles.tabText}>All Students</Text></TabHeading>}>
			            <AllStudents/>

			        </Tab>
			        		          	
		        </Tabs>
		    </Container>
		);
	}
}