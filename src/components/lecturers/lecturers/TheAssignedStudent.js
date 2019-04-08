import React, { Component } from 'react';
import {Text, Alert, TouchableOpacity, ToastAndroid} from 'react-native';
import { Icon, List, ListItem, Left, Body, Right } from 'native-base';
import {styles} from '../../../css/Styles';
import OptionsMenu from "react-native-options-menu";
import axios from 'axios';
import DialogProgress from 'react-native-dialog-progress';
const myIcon = (<Icon name='md-trash' style={{fontSize:23,color:'#555'}}/>);

const options = {
	title:"",
	message:"Please wait ...",
	isCancelable:true
}

export class TheAssignedCourse extends Component {

    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.deleteTheItem = this.deleteTheItem.bind(this);
    };

    deleteItem = (assign_id) => {
        Alert.alert(
            '',
            'Remove assigned course?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                
                { 
                    text: 'Yes', 
                    onPress: () => this.deleteTheItem(assign_id)
                },
            ],
            {cancelable: false},
          );
    }

    deleteTheItem = (assign_id) => {
        
        DialogProgress.show(options);
        axios({
            method: 'get',
            url: 'http://192.168.43.144:8000/lecturers/remove-assigned-course/'+assign_id,
        
        }).then(response => {
            
            if(response.status == 200) {
                if(response.data == 1) {
                    ToastAndroid.show('No course selected', ToastAndroid.SHORT);
                } else if(response.data == 2) {
                    ToastAndroid.show('Assigned course removed.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('ViewLecturer', {lecturer:this.props.lecturer_id, updated:true})
				} else {
                    ToastAndroid.show('Invalid request.', ToastAndroid.SHORT);
                }
                DialogProgress.hide();
            } else {
                ToastAndroid.show('Invalid request.', ToastAndroid.SHORT);
                DialogProgress.hide();
            }
        }).
        catch( (error) => {
            ToastAndroid.show('Invalid request.', ToastAndroid.SHORT);
            DialogProgress.hide();
        });
    }

    render() {
    
        return(
            <List>
                <ListItem avatar>
                    <Left>
                        <Text style={styles.bgNum}> {this.props.serial} </Text>
                    </Left>
                    <Body>
                        <Text style={styles.courseHeading}>{this.props.title} </Text>
                        <Text>{this.props.code}   {this.props.unit} units   {this.props.type}   {this.props.level}L </Text>
                    </Body>
                    <Right>
                        <OptionsMenu
                            customButton={myIcon}
                            options={["Remove Course"]}
                            actions={[this.deleteItem.bind(this,this.props.id)]}/>
                    </Right>
                </ListItem>
                	
            </List>
        );
    }
}