import React, { Component } from 'react';
import {Text, View,ScrollView, Textarea, Alert } from 'react-native';
import { Container, Content, Header, Icon, Button, Left, Right, Body, Title, Fab, List, ListItem, Thumbnail } from 'native-base';
import {styles} from '../../../css/Styles';
import { Dialog } from 'react-native-simple-dialogs';
import RNFetchBlob from "rn-fetch-blob";
import FileViewer from 'react-native-file-viewer';
import firebase from "react-native-firebase";
const fs = firebase.firestore();
const auth = firebase.auth();
const store = firebase.storage();
export class ViewProjects extends Component {

	static navigationOptions = {
	    header: null
	}
	
	constructor(props) {
		super(props);
		this.state={
			dialogVisible: false,
			studentId: this.props.navigation.getParam('studentId', ''),
			projects:[],
			projectIds:[],
			dProgress: 0,
		}
	}

	componentDidMount = () => {
		fs.collection('projects').where('studentId', '==', this.state.studentId).get().then(res =>{
			var projects = [];
			var projectIds = [];
			res.docs.forEach((val, index, arr) => {
				projectIds.push(val.id);
				projects.push(val.data());
			})
			this.setState({projects, projectIds})
		})
	};
	

	fetchOne(link){
		let dirs = RNFetchBlob.fs.dirs
		var name = store.refFromURL(link).fullPath.split('/')[5];
		RNFetchBlob.config({
			path : dirs.DocumentDir +name
		}).fetch('GET', link)
		.progress((received, total) => {
			var dProgress = (received/total)*100;
			this.setState({dProgress})
		}).then(res => {
			this.setState({dProgress:0});
			FileViewer.open(res.path())
		}).catch(err =>{

		})
	}
	
	render() {
		return (
	    	<Container>
				
				<Content>

					<Header style={styles.tabColor}>
			          	<Left>
				            
				        </Left>
			          	<Body style={{flex:1}}>
			            	<Title>Olakeji Oshodi Write Ups</Title>
			          	</Body>
			          	<Right>
			          		
				        </Right>
			        </Header>
					

					<ScrollView>
						{
							this.state.projects.length>0?(
								<List 
									dataArray={this.state.projects}
									renderRow={(data, IDK, index) => {
										<ListItem avatar button onPress={this.fetchOne(data.filePath)}>
											<Body>
												<Text style={styles.userName}>Proposal </Text>
												<Text>Sent on 17th January, 2019</Text>
											</Body>
											<Right>
												<Button transpparent onPress={() => this.props.navigation.navigate('uploadProjectts', {
													projectId: this.state.projectIds[index],
													studentId: this.state.studentId
												})}>
													Update
												</Button>
											</Right>
										</ListItem>
									}}
								/>
							):(null)
						}
					</ScrollView>

					
			  		
	      		</Content>
	  			<Dialog
					visible={this.state.dialogVisible}
					title="Custom Dialog"
					onTouchOutside={() => this.setState({dialogVisible: false})} >
					<View>
						// your content here
					</View>
				</Dialog>
			</Container>
	    );
	}
}