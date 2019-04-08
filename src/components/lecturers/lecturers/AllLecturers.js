import React, { Component } from 'react';
import {Text, View,ScrollView, Alert } from 'react-native';
import { Container, Header, Icon, Button, Left, Right, Body, Title, Fab, List, ListItem, Thumbnail } from 'native-base';
import {styles} from '../../../css/Styles';
import OptionsMenu from "react-native-options-menu";
import firebase from "react-native-firebase";
const fs = firebase.firestore();
const myIcon = (<Icon name='create' style={{fontSize:23,color:'#555'}}/>);


export class AllLecturers extends Component {

	static navigationOptions = {
	    header: null
	}
	  
	constructor(props) {
	    super(props);
	    
		this.state = {
			lecturer_id: '',
			isLoaded: false,
			lecturers: []
	    };
	}

	componentDidMount = () => {
	  this.fetch()
	}
	

	fetch(){
		var lecturers = [];
		fs.collection('lecturers').get().then(value => {
			value.docs.forEach((val, index, arr) =>{
				lecturers.push(val.data());
				this.setState({lecturers})
			})
		})
	}

	viewItem = () => {
		this.props.navigation.navigate('ViewLecturer');
	}

	editItem = () => {
        this.props.navigation.navigate('EditLecturer');
    }

    deleteItem = () => {
        Alert.alert(
            '',
            'Delete lecturer?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                
                { 
                    text: 'Yes', 
                    onPress: () => alert('Lecturer deleted')
                },
            ],
            {cancelable: false},
          );
    }
	
	render() {
		
		return(
			
			<Container>
				
				<Header style={styles.tabColor}>
		          	<Left style={{flex:1}}>
			            
			        </Left>
		          	<Body style={{flex:1}}>
		            	<Title>All Supervisors</Title>
		          	</Body>
		          	<Right style={{flex:1}}>
		          		<Button transparent>
			              <Icon name='search' />
			            </Button>
			        </Right>
		        </Header>
				<List
					dataArray={this.state.lecturers}
					renderRow={(data, ind, arr) => (
						<ListItem avatar>
							<Left>
								<Thumbnail source={require('../../../img/avatar.png')} />
							</Left>
							<Body>
								<Text style={styles.userName}  onPress={() => this.viewItem()}>{data.title}, {data.surname} {data.firstname} {data.middlename}</Text>
								<Text>{data.phone}</Text>
							</Body>
							<Right>
								<OptionsMenu
									customButton={myIcon}
									options={["Edit", "Delete"]}
									actions={[this.editItem.bind(this), this.deleteItem.bind(this)]}/>
							</Right>
						</ListItem>	
					)}
				/>
				<Fab
					direction="up"
					style={{ backgroundColor: '#932ab6' }}
					position="bottomRight"
					onPress={() => this.props.navigation.navigate('AddLecturer')}>
					<Icon name="md-add-circle"/>
				</Fab>
			</Container>
		);
	}
}