import React, { Component } from 'react';
import {Text, TouchableOpacity, Alert,PermissionsAndroid} from 'react-native';
import { Icon, List, ListItem, Left, Body, Right } from 'native-base';
import {styles} from '../../../css/Styles';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import OptionsMenu from "react-native-options-menu";
import Toast, {DURATION} from 'react-native-easy-toast';
const myIcon = (<Icon name='settings' style={{fontSize:23,color:'#555'}}/>);
const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;
import DialogProgress from 'react-native-dialog-progress';
const options = {
	title:"",
	message:"Please wait ...",
	isCancelable:true
}

export class TheProject extends Component {

    constructor(props) {
        super(props);
    };

    render () {

        return(

            
            <List>
                <ListItem avatar>
                    <Left>
                        <Text style={styles.bgNum}> {this.props.serial} </Text>
                    </Left>
                    <Body>
                        <Text style={styles.courseHeading}>{this.props.course_title} ({this.props.course_code}) </Text>
                        <TouchableOpacity>
                            <Text style={{marginBottom:15}}>{this.props.path}  ({this.props.size}) </Text>
                        </TouchableOpacity>
                        
                        <Text style={{fontSize:13}}>{this.props.uploaded_on} </Text>
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