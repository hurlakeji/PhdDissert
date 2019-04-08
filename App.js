import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { fromLeft } from 'react-navigation-transitions';

//Front

import { Home } from './src/components/Home';

//Admin Login Panel
import { AdminDashboard} from './src/components/AdminDashboard';
import { AdminAdd} from './src/components/AdminAdd';
import {AllPeople} from './src/components/AllPeople';

//Lecturer Panel
import { LecturerLogin } from './src/components/lecturers/LecturerLogin';
import { LecturerDashboard } from './src/components/lecturers/LecturerDashboard';

import { AddStudent } from './src/components/lecturers/students/AddStudent';
import { EditStudent } from './src/components/lecturers/students/EditStudent';
import { AssignStudent } from './src/components/lecturers/students/AssignStudent';
import { AllStudents } from './src/components/lecturers/students/AllStudents';

import { AddLecturer } from './src/components/lecturers/lecturers/AddLecturer';
import { EditLecturer } from './src/components/lecturers/lecturers/EditLecturer';
import { AllLecturers } from './src/components/lecturers/lecturers/AllLecturers';
import { MyProjectStudents } from './src/components/lecturers/projects/MyProjectStudents';
import { ViewProjects } from './src/components/lecturers/projects/ViewProjects';
import { uploadProjectts } from './src/components/lecturers/lecturers/uploadprojectts';

//Student Panel
import { StudentLogin } from './src/components/students/StudentLogin';
import { StudentDashboard } from './src/components/students/StudentDashboard';
import { UploadProject } from './src/components/students/UploadProject';

const AppNavigator  = createStackNavigator({

  Home: { 
      screen: Home
  },

  //Admin screen
  AdminDashboard:{
    screen: AdminDashboard
  },

  AdminAdd:{
    screen: AdminAdd
  },

  AllPeople:{
    screen: AllPeople
  },

  //lecturer screens

  LecturerLogin: { 
      screen: LecturerLogin
  }, 

  LecturerDashboard: { 
      screen: LecturerDashboard
  }, 

  uploadProjectts: {
     screen: uploadProjectts
  },

  AddStudent: { 
    screen: AddStudent  
  }, 

  EditStudent: { 
    screen: EditStudent  
  },
  
  AssignStudent: { 
    screen: AssignStudent  
  },
  
  AllStudents: { 
    screen: AllStudents  
  }, 

  AddLecturer: { 
      screen: AddLecturer
  },

  EditLecturer: { 
    screen: EditLecturer  
  }, 

  AllLecturers: { 
    screen: AllLecturers
  },

  ViewProjects: { 
    screen: ViewProjects
  },

  MyProjectStudents: { 
    screen: MyProjectStudents
  },


  //student screens
  
  StudentLogin: { 
    screen: StudentLogin 
  },

  StudentDashboard: { 
      screen: StudentDashboard
  },

  UploadProject: { 
    screen: UploadProject
  },
},
  
);

class App extends Component {
  render() {
    return (
        <AppNavigator/>
    );
  }
}


export default App;