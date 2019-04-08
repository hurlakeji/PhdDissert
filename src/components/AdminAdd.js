import React, { Component } from 'react';
import {Text, View, TouchableOpacity, AsyncStorage, ActivityIndicator,ScrollView, RefreshControl} from 'react-native';
import { Container, Header, Content, Button, Icon, Left, Right, Body, Title, Drawer, Footer, FooterTab } from 'native-base';
import { styles } from '../css/Styles';

export class AdminAdd extends Component {

	static navigationOptions = {
	    header: null
	}
	
	constructor(props) {
	    super(props);
	    
		this.state = {
			lecturer_details: [],
			the_details: [],
			lecturer_id: '',
			isLoaded: false,
			refreshing:false,
		};
	}
	
	render() {
		
		return (
			
			<Container>
				
				<Content>

					<Header style={styles.tabColor}>
						<Left style={{flex:1}}>
						
						</Left>
						<Body style={{flex:1}}>
							<Title>My Dashboard</Title>
						</Body>
						<Right style={{flex:1}}>
							
						</Right>
					</Header>

					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh}
							/>
						} >
						
							<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingLeft:13,paddingTop:20}}>
								<View style={{flexDirection:'row', flex:1, justifyContent:'flex-start'}}>
									<Text style={styles.smallHeadingText}> Hello Admin</Text>
								</View>
							</View>
							
							<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>

								<View style={{flexDirection:'row', width:200, flex:1, justifyContent:'flex-start'}}>

									<TouchableOpacity activeOpacity={1} style={styles.bgPurple} onPress={() =>this.props.navigation.navigate('AllLecturers')}>
										<Text style={styles.smallText}>All Lecturers </Text>
									</TouchableOpacity>
								</View>

							</View>

							<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>

								<View style={{flexDirection:'row', width:200, flex:1, justifyContent:'flex-start'}}>

									<TouchableOpacity activeOpacity={1} style={styles.bgPurple} onPress={() =>this.props.navigation.navigate('AllStudents')}>
										<Text style={styles.smallText}> All Students </Text>
									</TouchableOpacity>
								</View>

							</View>

							<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>

								<View style={{flexDirection:'row', width:200, flex:1, justifyContent:'flex-start'}}>

									<TouchableOpacity activeOpacity={1} style={styles.bgPurple}  onPress={() =>this.props.navigation.navigate('AllPeople')}>
										<Text style={styles.smallText}>Add supervisor/student </Text>
									</TouchableOpacity>
								</View>

							</View>
					</ScrollView>
				</Content>
				
			</Container>
			
				
	    );
	}
}