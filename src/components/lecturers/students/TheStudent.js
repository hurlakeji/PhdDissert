import React, { Component } from 'react';
import {Text, Alert} from 'react-native';
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

export class TheStudent extends Component {

    constructor(props) {
        super(props);
        this.editItem = this.editItem.bind(this);
    };

    viewItem = (student) => {
        this.props.navigation.navigate('ViewStudent', {
            student:student
        });
    }

    editItem = (student) => {
        this.props.navigation.navigate('EditStudent', {
            student:student
        });
    }

    deleteItem = (student) => {
        Alert.alert(
            '',
            'Delete student?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                
                { 
                    text: 'Yes', 
                    onPress: () => this.deleteTheItem(student)
                },
            ],
            {cancelable: false},
          );
    }

    deleteTheItem = (student) => {
        DialogProgress.show(options);
        axios({
            method: 'get',
            url: 'http://192.168.43.144:8000/students/admin-delete-student/'+student,
        
        }).then(response => {
            
            if(response.status == 200) {
                if(response.data == 1) {
                    this.refs.toast.show('Please select the student',DURATION.LENGTH_LONG);
                } else if(response.data == 2) {
                    this.refs.toast.show('Student details was successfully deleted.',DURATION.LENGTH_LONG);
                    this.props.navigation.navigate('AllStudents', {updated:true});
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
                        <Text style={styles.userName}  onPress={() => this.viewItem(this.props.id)}>{this.props.surname} {this.props.firstname} {this.props.middlename} </Text>
                        <Text>{this.props.matric}    {this.props.level}L   {this.props.phone}</Text>
                    </Body>
                    <Right>
                        <OptionsMenu
                            customButton={myIcon}
                            options={["Edit", "Delete"]}
                            actions={[this.editItem.bind(this,this.props.id), this.deleteItem.bind(this,this.props.id)]}/>
                    </Right>
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
