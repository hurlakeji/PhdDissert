import React, { Component } from 'react';
import {Text, Alert, TouchableOpacity} from 'react-native';
import { Icon, List, ListItem, Left, Thumbnail, Body, Right } from 'native-base';
import {styles} from '../../../css/Styles';
import OptionsMenu from "react-native-options-menu";
import axios from 'axios';
import Toast, {DURATION} from 'react-native-easy-toast';
import DialogProgress from 'react-native-dialog-progress';
const myIcon = (<Icon name='settings' style={{fontSize:23,color:'#555'}}/>);

const options = {
	title:"",
	message:"Please wait ...",
	isCancelable:true
}

export class TheLecturer extends Component {

    constructor(props) {
        super(props);
        this.editItem = this.editItem.bind(this);
    };

    assignItem = (lecturer) => {
        this.props.navigation.navigate('AssignCourseToLecturer', {
            lecturer:lecturer
        });
    }
    
    viewItem = (lecturer) => {
        this.props.navigation.navigate('ViewLecturer', {
            lecturer:lecturer
        });
    }

    editItem = (lecturer) => {
        this.props.navigation.navigate('EditLecturer', {
            lecturer:lecturer
        });
    }

    editProfile = () => {
        this.props.navigation.navigate('LecturerEditProfile');
    }

    deleteItem = (lecturer) => {
        Alert.alert(
            'Delete lecturer?',
            'All the course materials and assignments uploaded by this lecturer will be deleted as well. \n Delete?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                
                { 
                    text: 'Yes', 
                    onPress: () => this.deleteTheItem(lecturer)
                },
            ],
            {cancelable: false},
          );
    }

    deleteTheItem = (lecturer) => {
        DialogProgress.show(options);
        axios({
            method: 'get',
            url: 'http://192.168.43.144:8000/lecturers/admin-delete-lecturer/'+lecturer,
        
        }).then(response => {
            
            if(response.status == 200) {
                if(response.data == 1) {
                    this.refs.toast.show('Please select the lecturer',DURATION.LENGTH_LONG);
                } else if(response.data == 2) {
                    this.refs.toast.show('Lecturer details was successfully deleted.',DURATION.LENGTH_LONG);
                    this.props.navigation.navigate('AllLecturers', {updated:true});
				} else {
                    this.refs.toast.show('Invalid request',DURATION.LENGTH_LONG);
                }
                DialogProgress.hide();
            } else {
                this.refs.toast.show('Invalid request',DURATION.LENGTH_LONG);
                DialogProgress.hide();
            }
        }).
        catch( (error) => {
            this.refs.toast.show(error,DURATION.LENGTH_LONG);
            DialogProgress.hide();
        });
    }

    render() {
        return(
            <List>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={require('../../../img/avatar.png')} />
                    </Left>
                    <Body>
                        <Text style={styles.lectName}  onPress={() => this.viewItem(this.props.id)}>{this.props.title} {this.props.firstname} {this.props.middlename} {this.props.surname} </Text>
                        <Text>{this.props.phone}   </Text>
                    </Body>
                    {this.props.logged_id != this.props.id ?
                        <Right>
                            <OptionsMenu
                                customButton={myIcon}
                                options={["Edit", "Assign Courses", "Delete"]}
                                actions={[this.editItem.bind(this,this.props.id), this.assignItem.bind(this,this.props.id), this.deleteItem.bind(this,this.props.id)]}/>
                        </Right> : 
                        <Right>
                            <OptionsMenu
                                customButton={myIcon}
                                options={["Edit", "Assign Courses"]}
                                actions={[this.editProfile.bind(this,this.props.id), this.assignItem.bind(this,this.props.id)]}/>
                        </Right>
                    }
                </ListItem>	
                <Toast
                    ref="toast"
                    style={{backgroundColor:'black'}}
                    position='bottom'
                    positionValue={80}
                    fadeInDuration={200}
                    fadeOutDuration={3000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
                />
            </List>
        );
    }
}