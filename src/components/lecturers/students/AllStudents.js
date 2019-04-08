import React, { Component, Flatlist } from 'react';
import {Text, Alert, View, ActivityIndicator,ScrollView } from 'react-native';
import { Container, Header, Icon, Button, Left, Right, Body, Title, Fab, List, ListItem, Thumbnail, Row } from 'native-base';
import {styles} from '../../../css/Styles';
import OptionsMenu from "react-native-options-menu";
import Toast, {DURATION} from 'react-native-easy-toast';


const myIcon = (<Icon name='create' style={{fontSize:23,color:'#555'}}/>);
import firebase from "react-native-firebase";
const fs = firebase.firestore();
export class AllStudents extends Component {

	static navigationOptions = {
	    header: null
	}
	  
	constructor(props) {
	    super(props);
	    
		this.state = {
			isLoaded: false,
			studentsId:[],
			students: [],
		};
		
	}

	componentDidMount = () => {
		this.fetch();
	}
	

	fetch(){
		var students = [];
		var studentsId = [];
		fs.collection('students').get().then(value => {
			value.docs.forEach((val, index, arr) =>{
				studentsId.push(val.id);
				students.push(val.data());
				this.setState({students, studentsId})
			})
		})
	}

	viewItem(){
		this.props.navigation.navigate('ViewStudent', {studentId: id});
	}

	assignItem(id){
        this.props.navigation.navigate('AssignStudent', {studentId: id});
	}
	
	editItem(id){
        this.props.navigation.navigate('EditStudent', {studentId: id});
    }

    deleteItem(id){
        Alert.alert(
            '',
            'Delete student?'+id,
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { 
                    text: 'Yes', 
                    onPress: () => this.delete(id)
                }
            ],
            {cancelable: false},
        );
	}
	

	delete(id){
		fs.collection('students').doc(id).delete().then(() =>{
			this.fetch()
		}).catch(() => {
			this.refs.toast.show('An error occured!',DURATION.LENGTH_LONG);
		})
	}
	
	render() {
		
		return(

			<Container>
				
				<Header style={styles.tabColor}>
		          	<Left style={{flex:1}}>
			            
			        </Left>
		          	<Body style={{flex:1}}>
		            	<Title>All Students</Title>
		          	</Body>
		          	<Right style={{flex:1}}>
		          		<Button transparent>
			              <Icon name='search' />
			            </Button>
			        </Right>
		        </Header>
				
				<ScrollView>
					{
						this.state.students.length >0?(
							<List
						dataArray={this.state.students}
						renderRow={
							(data, IDK, ind) => (
								<ListItem avatar>
									<Left>
										<Thumbnail source={require('../../../img/avatar.png')} />
									</Left>
									<Body>
										<Text style={styles.userName}  onPress={() => this.viewItem()}>{data.surname} {data.firstname} {data.middlename}</Text>
										<Text>{data.matric}    {data.level}   {data.phone}</Text>
									</Body>
									<Right>
										<Row>
											<Button transparent onPress={() => {
												this.editItem(this.state.studentsId[ind])
											}}>
												<Icon name='create'/>
											</Button>
											<Button transparent onPress={() => {
												this.deleteItem(this.state.studentsId[ind])
											}}>
												<Icon name='trash'/>
											</Button>
											<Button transparent onPress={() => {
												this.assignItem(this.state.studentsId[ind])
											}}>
												<Icon name='people'/>
											</Button>
										</Row>
									</Right>
								</ListItem>	
							)
						}
					/>
						):(null)
					}
				</ScrollView>

				<Fab
					direction="up"
					style={{ backgroundColor: '#932ab6' }}
					position="bottomRight"
					onPress={() => this.props.navigation.navigate('AddStudent')}>
					<Icon name="md-add-circle"/>
				</Fab>
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
			</Container>
		);
	}
}