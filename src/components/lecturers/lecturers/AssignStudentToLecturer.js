import React, { Component } from 'react';
import { Text, View, ActivityIndicator, ToastAndroid } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button,  Left, Right, Body, Title, Picker, Fab } from 'native-base';
import {styles} from '../../../css/Styles';
import axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast';
import DialogProgress from 'react-native-dialog-progress';

const options = {
	title:"",
	message:"Please wait..",
	isCancelable:true
}

export class AssignStudentToLecturer extends Component {

	static navigationOptions = {
	     header: null
	}
	  
	constructor(props) {
	    super(props);
	    this.state = {
            lecturer_id: props.navigation.state.params.lecturer,
			courses: [],
			course:'',
			showToast: false,
			isLoaded:false,
	    };

		this.onCourseChange = this.onCourseChange.bind(this);
	}
    
    componentDidMount() {
		
        axios
        .get('http://192.168.43.144:8000/courses/') 
        .then( (response) => {
            this.setState({
                courses: response.data,
                isLoaded:true
            });
        })
        .catch( (error) => {
            console.error(error);
        });
    }
	
	onCourseChange = (value) => {
	    this.setState({
	      	course: value
	    });
	}

	resetForm = () => {
		this.setState({
			course: '',
		});
	}

	validateForm = (course_id) => {
		
		if(course_id == "") {
			return 1;
		} else {
			return 0;
		}
	}

	assignCourse = () => {
		let course_id = this.state.course;
		let validateForm = this.validateForm(course_id);
		
		if(validateForm == 1) {
			ToastAndroid.show('Select a course', ToastAndroid.SHORT);
			return false;
		} else {

			DialogProgress.show(options);
		
			let data = JSON.stringify({
				course: course_id
			});
			
			axios({
				method: 'post',
				data: data,
			    url: 'http://192.168.43.144:8000/lecturers/assign-course/'+this.state.lecturer_id,
			}).then(response => {
				
				if(response.status == 200) {
					if(response.data == 1) {
						ToastAndroid.show('Select at least one course', ToastAndroid.SHORT);
					} else if(response.data == 2) {
						ToastAndroid.show('This lecturer has already been assigned to supervise the selected course', ToastAndroid.LONG);
					} else if(response.data == 3) {
						ToastAndroid.show('Lecturer was successfully assigned to the selected courses', ToastAndroid.SHORT);
						setTimeout(
							() => {
								this.props.navigation.navigate('ViewLecturer', {lecturer:this.state.lecturer_id});
							}
						, 100);
						this.resetForm();
					} else {
						ToastAndroid.show('Invalid request. Try again.', ToastAndroid.SHORT);
					}
					DialogProgress.hide();
				} else {
					ToastAndroid.show('Invalid request. Try again.', ToastAndroid.SHORT);
					DialogProgress.hide();
				}
			}).
			catch( (error) => {
				ToastAndroid.show('Invalid request. Try again.', ToastAndroid.SHORT);
				DialogProgress.hide();
			});
		}
	}

	render() {

		let course_details = this.state.courses.map( (course,key) => {
			let the_course = course.title+" ("+course.code+")";

			return (
				<Picker.Item key={key} label={the_course} value={course.id}/>
			)
		});

		return(
			<Container>
				
				<Header style={styles.tabColor}>
		          	<Left style={{flex:1}}>
			            <Button transparent>
			              <Icon name='menu'/>
			            </Button>
			        </Left>
		          	<Body style={{flex:1}}>
		            	<Title>Assign Course</Title>
		          	</Body>
		          	<Right style={{flex:1}}>
		          		
			        </Right>
		        </Header>

				<Content>
                    
                    {!this.state.isLoaded ?

                        <View style={styles.theLoading}>
                            <ActivityIndicator size='large' />
                        </View> :

                        <View style={{marginTop:20}}>
                            
							<View style={styles.Inputs}>
								<Text style={{fontSize:14,fontWeight:'bold'}}> Course </Text>
						
                            	<Picker
									mode="dropdown"
									iosHeader="Select course"
									iosIcon={<Icon name="ios-arrow-down-outline" />}
									style={{ width: undefined }}
									selectedValue={this.state.course}
									onValueChange={this.onCourseChange}
								>
									<Picker.Item label="--Select Course --" value=""/>
									{course_details}
								</Picker>
							</View>

                            <Button full success style={styles.greenButtonWithoutBottom} onPress={() => this.assignCourse()}>
                                <Text style={{color:'#fff',fontSize:18}}><Icon name="md-checkmark-circle"/>  Assign</Text>
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
                    }
		        </Content>
		    </Container>
		);
	}
}