import React, { Component } from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Tab, Tabs, TabHeading, ScrollableTab, Button,  Left, Right, Body, Title, Picker, Fab  } from 'native-base';
import {styles} from '../css/Styles';
import axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast';
import DialogProgress from 'react-native-dialog-progress';
import AddLecturer  from './lecturers/lecturers/AddLecturer';
import AddStudent from './lecturers/students/AddStudent';
const options = {
	title:"",
	message:"Please wait..",
	isCancelable:true
}

export class AllPeople extends Component {

	static navigationOptions = {
	    header: null
	}

    constructor(props) {
	    super(props);
	    this.state = {    
		};
	}
    render() {
		return(
			<Container>
              	<Header style={styles.tabColor} hasTabs>
		          	<Left style={{flex:1}}>
			            <Button transparent>
			              <Icon name='menu'/>
			            </Button>
			        </Left>
		          	<Body style={{flex:1}}>
		            	<Title>Add people</Title>
		          	</Body>
		          	<Right style={{flex:1}}>
		          		
			        </Right>
		        </Header>
                <Content contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
					<Button style={[styles.homeLectButton, {paddingHorizontal: 20}]} onPress={() => this.navigate('AddLecturer')}>
						<Text style={{color:'white', fontSize:20, paddingLeft:10}}> Add lecturers </Text>
					</Button>
					<Button style={styles.homeLectButton} onPress={() => this.navigate('AddStudent')}>
						<Text style={{color:'white', fontSize:20, paddingLeft:10}}> Add students </Text>
					</Button>
					<Button style={styles.homeLectButton} onPress={() => this.navigate('AssignStudent')}>
						<Text style={{color:'white', fontSize:20, paddingLeft:10}}> Assign students </Text>
					</Button>
				
				</Content>
            </Container>
		);
	}
	navigate(route){
		this.props.navigation.navigate(route)
	}
}