import React, { Component } from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from '../../css/Styles';

export const TheLecturerDashboard = (props) => {
    
    return(

        <ScrollView>
            
            {props.role == "admin" ?
            
                <View>
                    
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingLeft:13,paddingTop:20}}>
                        <View style={{flexDirection:'row', flex:1, justifyContent:'flex-start'}}>
                            <Text style={styles.smallHeadingText}> Welcome, {props.title} {props.firstname} {props.surname} (Administrator)</Text>
                        </View>
                    </View>
                    
                    {/* <View style={{flexDirection:'row', flex:1, justifyContent:'flex-start'}}>

                        <TouchableOpacity activeOpacity={1} style={styles.bgGreen}>
                            <Text style={styles.smallText}> My Attendance Report </Text>
                        </TouchableOpacity>
                    </View> */}
                    
                    <View style={{flexDirection:'row', flex:1, justifyContent:'flex-start'}}>

                        <TouchableOpacity activeOpacity={1} style={styles.bgGreen} onPress={props.attendance_screen}>
                            <Text style={styles.smallText}> Attendance </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row', flex:1, justifyContent:'flex-start'}}>

                        <TouchableOpacity activeOpacity={1} style={styles.bgNavy}  onPress={props.timetable_screen}>
                            <Text style={styles.smallText}> Timetable </Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        
                        <View style={{flexDirection:'row', flex:1, justifyContent:'flex-start'}}>
                            <TouchableOpacity activeOpacity={1} style={styles.bgBrown} onPress={props.students_screen}>
                                <Text style={styles.boxText}> {props.count_students} </Text>
                                <Text style={styles.smallText}> Students </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection:'row', flex:1, alignItems:'center', justifyContent:'flex-end'}}>

                            <TouchableOpacity activeOpacity={1} style={styles.bgNavy} onPress={props.lecturers_screen}>
                                <Text style={styles.boxText}> {props.count_lecturers}  </Text>
                                <Text style={styles.theSmallText}> Lecturers </Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>

                        <View style={{flexDirection:'row', width:200, flex:1, justifyContent:'flex-start'}}>

                            <TouchableOpacity activeOpacity={1} style={styles.bgPurple} onPress={props.courses_screen}>
                                <Text style={styles.boxText}> {props.count_courses}  </Text>
                                <Text style={styles.smallText}> Courses </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection:'row', width:200, flex:1, justifyContent:'flex-start'}}>

                            <TouchableOpacity activeOpacity={1} style={styles.bgMaroon} onPress={props.venues_screen}>
                                <Text style={styles.boxText}> {props.count_venues} </Text>
                                <Text style={styles.smallText}> Venues </Text>
                            </TouchableOpacity>
                        </View> 

                    </View>

                    <View>

                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            
                            <View style={{flexDirection:'row', flex:1, alignItems:'center', justifyContent:'flex-end'}}>

                                <TouchableOpacity activeOpacity={1} style={styles.bgOlive} onPress={props.materials_screen}>
                                    <Text style={styles.boxText}> {props.count_materials} </Text>
                                    <Text style={styles.theSmallText}> Materials </Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={{flexDirection:'row', flex:1, alignItems:'center', justifyContent:'flex-end'}}>

                                <TouchableOpacity activeOpacity={1} style={styles.bgBlu} onPress={props.assignments_screen}>
                                    <Text style={styles.boxText}> {props.count_assignments} </Text>
                                    <Text style={styles.theSmallestText}> Assignments </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View> 
                </View> : 

                <View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingLeft:15,paddingTop:20}}>
                        <View style={{flexDirection:'row', flex:1, justifyContent:'flex-start'}}>
                            <Text style={styles.smallHeadingText}> Welcome, {props.title} {props.firstname} {props.surname} </Text>
                        </View>
                    </View>
                    
                    
                    <View style={{flexDirection:'row', flex:1, justifyContent:'flex-start'}}>

                        <TouchableOpacity activeOpacity={1} style={styles.bgGreen}>
                            <Text style={styles.smallText}> My Attendance Report </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row', flex:1, justifyContent:'flex-start'}}>

                        <TouchableOpacity activeOpacity={1} style={styles.bgOlive} onPress={props.materials_screen}>
                            <Text style={styles.boxText}> {props.count_materials} </Text>
                            <Text style={styles.theSmallText}> My Materials </Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{flexDirection:'row', flex:1, justifyContent:'flex-start'}}>
                    
                        <TouchableOpacity activeOpacity={1} style={styles.bgBlu} onPress={props.assignments_screen}>
                            <Text style={styles.boxText}> {props.count_assignments} </Text>
                            <Text style={styles.theSmallestText}> My Assignments </Text>
                        </TouchableOpacity>

                    </View>
            
            </View>
            }
        </ScrollView>
    );
}