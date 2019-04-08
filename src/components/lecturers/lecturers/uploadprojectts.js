import React, { Component } from 'react';
import { Text, View, AsyncStorage} from 'react-native';
import { Container, Content, Picker, Textarea, Header, Left, Button, Icon, Body, Title, Right, Fab } from 'native-base';
import {styles} from '../../../css/Styles';
import Toast, {DURATION} from 'react-native-easy-toast';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import FilePickerManager from 'react-native-file-picker';
import firebase from "react-native-firebase";
import RNGRP from 'react-native-get-real-path';
const fs = firebase.firestore();
const store = firebase.storage();
const options = {
	title:"",
	message:"Please wait.. ",
	isCancelable:true
}

export class uploadProjectts extends Component {

	static navigationOptions = {
		 header: null,
	}

	constructor(props) {
	    super(props);
	    this.state = { 
			note: "",
			name:'',
			selectedFileUri: "",
			selectedFile: "",
			selectedFileSize: "",
			selectedFileType: "",
			absPath: "",
			studentId: this.props.navigation.getParam('studentId', ''),
			projectId: this.props.navigation.getParam('projectId', ''),
			isSelected: false,
			project:{}
		};
	}

	componentDidMount = () => {
		if(this.state.projectId!==''){
			fs.collection('projects').doc(this.state.projectId).get().then(res =>{
				this.setState({project: res.data()})
			})
		}else{

		}
	};
	

	update(){
		var s = this.state;
		var val = {
			studentId: s.studentId,
			projectId: s.projectId,
			note: s.note
		}
		var ref = store.refFromURL(this.state.project.filePath).putFile(this.state.absPath).then(res => {
			fs.collection('projects_comment').add(val).then(res => {
				this.refs.toast.show('Project updated successfully '+err.message,DURATION.LENGTH_LONG);
			}).catch(err =>{
				this.refs.toast.show('An error occured. '+err.message,DURATION.LENGTH_LONG);
			})
		}).catch(err =>{
			this.refs.toast.show('An error occured. '+err.message,DURATION.LENGTH_LONG);
		})
	}

	submit(){
		var path = "";
		RNFetchBlob.fs.stat()
		var s = this.state;
		var val = {
			studentId: s.studentId,
			note: s.note
		}
		fs.collection('projects').add(val).then(res =>{
			var ref = store.ref('projects/'+res.id+'/'+s.selectedFile);
			ref.putFile(this.state.absPath).then(value =>{
				fs.collection('projects').doc(res.id).update({
					filePath: value.downloadURL
				}).then(() =>{
					this.refs.toast.show('Project uploaded successfully '+err.message,DURATION.LENGTH_LONG);
				}).catch((err) =>{
					this.refs.toast.show('An error occured. '+err.message,DURATION.LENGTH_LONG);
				})
			}).catch(err =>{
				this.refs.toast.show('An error occured. '+err.message,DURATION.LENGTH_LONG);
			})
		}).catch(() => {
			this.refs.toast.show('An error occured. '+err.message,DURATION.LENGTH_LONG);
		})
	}
	  
	getFileSize = (size) => {
		let file_sizes = ["B", "KB" , "MB" , "GB" , "TB" , "PB" , "EB" , "ZB" , "YB"];
		let index = 0;
		
		while(size >= 1024) {
			size = size/1024;
			index++;
		}
		
		let formatted_size = Math.round(size*100)/100;
		let the_size = formatted_size+" "+file_sizes[index];
		return the_size;
	}
	
	selectMaterial = () => {
		// FilePickerManager.showFilePicker(null,(response) => {
		// 	console.log('Response = ', response);
		// 	if (response.didCancel) {
		// 	  console.log('User cancelled file picker');
		// 	}
		// 	else if (response.error) {
		// 	  console.log('FilePickerManager Error: ', response.error);
		// 	}
		// 	else {
		// 		this.setState({
		// 			selectedFileUri: response.uri,
		// 			selectedFile: response.fileName,
		// 			selectedFileType: response.type,
		// 			selectedFileSize: this.getFileSize(response.fileSize),
		// 			absPath: response.path,
		// 			isSelected:true
		// 		});
		// 	}
		// });
	    DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
          },(error,response) => {
				RNGRP.getRealPathFromURI(response.uri).then(path =>{
					this.setState({
						selectedFileUri: response.uri,
						selectedFile: response.fileName,
						selectedFileType: response.type,
						selectedFileSize: this.getFileSize(response.fileSize),
						absPath: "file://"+path,
						isSelected:true
					});
				})
          });
	}


	uploadProject = () => {
		setTimeout(
			() => {
				this.props.navigation.navigate('', {updated:true});
			}
		, 100);
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
		            	<Title>Update Project</Title>
		          	</Body>
		          	<Right style={{flex:1}}>
		          		
			        </Right>
		        </Header>

				<Content>
					<View style={{marginTop:20}}>

						<Button style={styles.selectFile} onPress={() => this.selectMaterial()}> 
							<Text style={{fontSize:16}}> Upload thesis Chapters </Text>
						</Button>
						<View style={{marginLeft:30,fontWeight:'bold'}}>
							{this.state.isSelected ? 
								<View>
									<Text> {this.state.absPath} ({this.state.selectedFileSize})</Text>
								</View> : null
							}
						</View>
						
						<View style={styles.Inputs}>
						
						    <Text style={styles.label}> Short Note (optional): </Text>
							<Textarea rowSpan={5} bordered placeholder="Write additional information here"  onChangeText = { (text) => this.setState({note: text}) } value={this.state.note}/>
						</View>

				        <Button full success style={styles.greenButtonWithTopBottom} onPress={() => this.update()}>
			         		<Text style={{color:'#fff',fontSize:18}}><Icon name="md-cloud-upload"/>  Upload </Text>
			         	</Button>

						
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

						

					</View>
		        </Content>
		    </Container>
		);
	}
}