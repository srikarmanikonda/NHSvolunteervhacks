import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity,TextInput,Alert,Linking,Button,SafeAreaView, ScrollView,Dimensions } from 'react-native';
import Unknown3 from './assets/Unknown-3.png';
import NHSlogo from './assets/NHS_Scholarship.png'
import * as Font from 'expo-font'
import * as Google from 'expo-google-app-auth'
import Firebase from './components/firebase.js'
import 'react-native-gesture-handler';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer'
//import { createStackNavigator} from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import HomButton from './components/button.js';
import Signoutbutton from './components/signoutbutton.js'
import {AntDesign,Feather} from 'react-native-vector-icons';
import ProgressCircle from 'react-native-progress-circle'
import {CalendarList, Agenda,calendarTheme} from 'react-native-calendars'
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RNCalendarEvents from 'react-native-calendar-events'
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createCompatNavigatorFactory } from '@react-navigation/compat';
var x = 0
var please = ''
var usernam = ''
var newPassword
var emailtime = ''
var grad = ''
var wid = Dimensions.get('screen').width
var heigh = Dimensions.get('screen').height
var calendartypebeat
var dates = ['2020-05-21','2020-05-07','2020-05-15']
var setit
var checkfirst = false
var checksecond = false
var checkthird = false
class HomeScreen extends React.Component{

  static navigationOptions = {
    title: 'Home',
  };

 render(){
   const {navigate} = this.props.navigation;
 return (
 <  View style={styles.container}>
 <LinearGradient
 colors = {['#bab9cb','#3c93dd','#5ea9e9']}
 style={{
           position: 'absolute',
           left: 0,
           right: 0,
           top: 0,
           height:"100%",
         }}
         />
     <Image source ={Unknown3} style={styles.logo} />
     <Image source = {NHSlogo} style ={styles.NHSlogo} />
       <Text style = {styles.intromessage}>
       VHHS National Honors Society Volunteer App
       </Text>
       <TouchableOpacity
       onPress={() =>/*async () =>{
           try {
             const result = await Google.logInAsync({
               //androidClientId: YOUR_CLIENT_ID_HERE,
               iosClientId: "415010913513-8g1d2qlog18gv83roe1dhh7bhrlcb9s1.apps.googleusercontent.com",
               scopes: ['profile', 'email'],
             });

             if (result.type === 'success') {
               return result.accessToken;
             } else {
               return { cancelled: true };
             }
           } catch (e) {
             return { error: true };
           }
           */


           navigate('Login')
         }
       style={ styles.signUpStyle }>
       <Text style={ styles.buttontext }>Log In</Text>
     </TouchableOpacity>

     <TouchableOpacity
     style = {styles.signUpStyle2}
     onPress = {() =>navigate('Details')}>
     <LinearGradient colors={['#43D4FF', '#38ABFD', '#2974FA']} style={styles.gradient}>
     </LinearGradient>
     <Text style={ styles.buttontext }>Sign Up With Email</Text>

 </TouchableOpacity>
     </View>
 );
}
}






 class  DetailsScreen extends React.Component{
   constructor(props){
     super(props);
     this.state={
       username:'',
       email:'',
       password:'',
       grade:''
     }
   }
  static navigationOptions = {
    title: 'Details',
  };

   render(){
     newPassword = this.state.password
     usernam = this.state.username
     grad = this.state.grade
     const {navigate} = this.props.navigation;

 return (
   <View style={ styles.container }>
   <LinearGradient
   colors = {['#bab9cb','#3c93dd','#5ea9e9']}
   style={{
             position: 'absolute',
             left: 0,
             right: 0,
             top: 0,
             height:"100%",
           }}
           />
   <Image source = {NHSlogo} style ={styles.NHSlogo2} />


   <View style = {styles.inputView}>
   <TextInput
     style={styles.inputText}
     placeholder = "  First and last name..."
     placeholderTextColor="silver"
     onChangeText={username => this.setState({username })}
     value={this.state.username}/>
</View>

     <View style={styles.inputView} >
     <TextInput
       style={styles.inputText}
       placeholder = "Grade (11 or 12)..."
       placeholderTextColor="silver"
       onChangeText={grade => this.setState({grade })}
       value={this.state.grade}/>
       </View>


         <View style={styles.inputView} >
         <TextInput
           style={styles.inputText}
           placeholder = "Email... (school address please)"
           placeholderTextColor="silver"
           onChangeText={email => this.setState({ email })}
           value={this.state.email}


                      />
           </View>


           <View style={styles.inputView} >
             <TextInput
               style={styles.inputText}
               placeholder = "Password..."
               textContentType="newPassword"
               secureTextEntry={true}
               placeholderTextColor="silver"
               returnKeyType = "done"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}

               />
               </View>
               <TouchableOpacity
               style = {styles.signUpStyle4}
               onPress ={() =>
                 {Firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).catch(function(error){alert("There has been an error in signing up your account. Please check all fields again carefully and try again",console.log(error))}).then(function () {

                   Firebase.database().ref('users/' + Firebase.auth().currentUser.uid).set({
                     username:usernam,
                     email: Firebase.auth().currentUser.email,
                     password :newPassword,
                     hours:0,
                     grade:grad

                   })

                 }).then(Alert.alert("Thanks for signing up!"), ("Your account has been created and will be approved soon!")).then(navigate("Home"))
            }


        }>





               <Text style={ styles.buttontext }> Sign Up </Text>
               </TouchableOpacity>

               <HomButton
               text = "home"
               onPress = {() => navigate('Home')}

/>
<AntDesign name='home'
onPress = {() =>navigate('Home')}
size = {65}/>



   </View>

 );
}

}



class Loginscreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
    }
  }

  static navigationOptions = {
    title: 'Login',
  };

  render(){
    const {navigate} = this.props.navigation;
 return(
 < View
 style={styles.container}>
 <LinearGradient
 colors = {['#bab9cb','#3c93dd','#5ea9e9']}
 style={{
           position: 'absolute',
           left: 0,
           right: 0,
           top: 0,
           height:"100%",
         }}
         />
<Image source={require('./assets/vhlogo.png')} style={{height: "20%", width: "35%"}}/>
         <View style={styles.inputView} >
         <TextInput
           style={styles.inputText}
           placeholder = "Email..."
           placeholderTextColor="silver"
           onChangeText={email => this.setState({ email })}
           value={this.state.email}

           />
           </View>


           <View style={styles.inputView} >
             <TextInput
               style={styles.inputText}
               placeholder = "password"
               textContentType="newPassword"
               secureTextEntry={true}
               placeholderTextColor="silver"
               returnKeyType="done"
               onChangeText={password => this.setState({ password })}
               value={this.state.password}


               />
               </View>
               <TouchableOpacity
               style = {styles.signUpStyle3}
               onPress = {() =>
                 Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error){alert("There has been an issue logging in. Please check that all details were entered correctly. ") }).then(() =>     Firebase.database().ref('/users/' + Firebase.auth().currentUser.uid + '/hours').once('value', function(snapshot) {
                         x = (snapshot.val())

                    })).then(() =>     Firebase.database().ref('/users/' + Firebase.auth().currentUser.uid + '/username').once('value', function(snapshot) {
                            please = (snapshot.val())
})).then(() =>     navigate("Dashboard"))




         }
               >


               <Text style={ styles.buttontext }>Log in </Text>

               <LinearGradient colors={['#43D4FF', '#38ABFD', '#2974FA']}
               >
               </LinearGradient>
               </TouchableOpacity>

                              <HomButton
                              text = "home"
                              onPress = {() => navigate('Home')}

               />



               <AntDesign name='home'
               onPress = {() =>navigate('Home')}
               size = {65}/>

</View>
 );
}
}


class  DashboardScreen extends React.Component{

  static navigationOptions = {
    title: 'Dashboard',
  };


  render(){

    const {navigate} = this.props.navigation;

 return(
 <View
 style={styles.container}>
 <LinearGradient
 colors = {['#bab9cb','#3c93dd','#5ea9e9']}
 style={{
           position: 'absolute',
           left: 0,
           right: 0,
           top: 0,
           height:"100%",
         }}
    >


</LinearGradient>
<View style = {{bottom:"3.5%"}}>
<Text style = {{fontSize:48}}> Dashboard </Text>
</View>
<Feather name='menu' size={33} onPress={()=> this.props.navigation.openDrawer()} style={{right:"40%",top:"-10%",color:'#fff'}}/>

 <Text style = {{fontSize:35,color:"#fff",fontFamily:"AppleSDGothicNeo-Bold"}}> Welcome Back {please}. There are quite a few volunteer events available for your NHS hours!</Text>

<View style = {{bottom:"-10%"}}>
<Text style = {{fontSize:35,color:"#fff",fontFamily:"AppleSDGothicNeo-Bold"}}>Keep Working hard! You are almost there! You are {x*5}% of the way there! </Text>
</View>

<Signoutbutton
onPress = {() =>Alert.alert(
  'Sign out',
  'Would you like to sign out?',
  [
    { text: 'Ok', onPress: () => Firebase.auth().signOut().then(() =>navigate('Home'))},
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { cancelable: false }
]
  // Sign-out successful.);
)}/>
<Feather name = 'arrow-left'
size = {85}
style={{right:"1%",top:"1%",color:'#fff'}}
onPress = {()=> Alert.alert(
  'Sign out',
  'Would you like to sign out?',
  [
    { text: 'Ok', onPress: () => Firebase.auth().signOut().then(() =>navigate('Home'))},
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { cancelable: false }
]
  // Sign-out successful.);
)}/>


         </View>
           );
         }
       }



    class Myhours extends React.Component{


      static navigationOptions = {
        title: 'My Hours',
      };


         render(){


           const {navigate} = this.props.navigation;
           return(
             < View
             style={styles.container}>
             <LinearGradient
             colors = {['#bab9cb','#3c93dd','#5ea9e9']}
             style={{
                       position: 'absolute',
                       left: 0,
                       right: 0,
                       top: 0,
                       height:"100%",
                     }}

                />
                <View>
                <Text
                style = {{top:"-50%",
                bottom:"155%",
              fontSize:48}}> My Hours </Text>
              </View>
              <Feather name='menu' size={35} onPress={()=> this.props.navigation.openDrawer()} style={{right:"40%",top:"-10%",color:'#fff'}}/>


                <ProgressCircle
                          style = {{marginTop:"-100%"}}
                         percent={x*5}
                         radius={150}
                         borderWidth={20}
                         color="#3399FF"
                         shadowColor="#999"
                         bgColor="#fff">
                         <Text style={{ fontSize: 34,
                         }}>{   x + ' ' +'hours completed'  }</Text>

                         </ProgressCircle>
                         <HomButton
                         text = "home"
                         onPress = {() => navigate('Dashboard')}

          />
          <AntDesign name='home'
          onPress = {() =>navigate('Dashboard')}
          size = {65}/>

                         <TouchableOpacity
                         style = {{width:"80%",
                           backgroundColor:"silver",
                           borderRadius:25,
                           height:"6%",
                           alignItems:"center",
                           justifyContent:"center",
                           top:"4%"}}
                         onPress ={ () => {
                           try{Linking.openURL("https://forms.gle/DvSu9THVKC4NmhcaA")
                         }
                       catch(err){
                         alert("An error occured opening the support form. Please contact administration")
                       }}}>
                         <Text style={ {fontSize:23,
                           color:"#fff"}}> Submit support request </Text>

                         </TouchableOpacity>



                     </View>
           );
         }
       }




        class MyOpps extends React.Component{
          constructor(props) {
  super(props);
  this.state = {
    selected: undefined,
    items:{'2020-05-20': [{name: 'NHS sample volunteer event #1 (1-2 pm)'}],
    '2020-05-06': [{name: 'NHS sample volunteer event #2 (1-2 pm)'}],
    '2020-05-13':[{name: 'NHS sample volunteer event #3 (1-2 pm)'}],
  }
}
}


  onDayPress = (day) => {
    this.setState({selected: day.dateString});
  }



          static navigationOptions = {
            title: 'My opportunities',
          };



          render(){
            async function alertIfRemoteNotificationsDisabledAsync() {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR);
    if (status !== 'granted') {
      alert('Hey! We need access to your calendar to enable you to sign you up for events.');
    }
  }
  async function getDefaultCalendarSource() {
  const calendars = await Calendar.getCalendarsAsync();
  const defaultCalendars = calendars.filter(each => each.source.name === Firebase.auth().currentUser.email);
  var flag = false

  for(var i =0;i <defaultCalendars.length;i++){
    if(defaultCalendars[i].allowsModifications == true){
    calendartypebeat =   defaultCalendars[i].id
       break;

    }

  }
}





alertIfRemoteNotificationsDisabledAsync()
getDefaultCalendarSource()
console.log(calendartypebeat)
         return(
         < View
         style={styles.container}>
         <LinearGradient
         colors = {['#bab9cb','#3c93dd','#5ea9e9']}
         style={{
                   position: 'absolute',
                   left: 0,
                   right: 0,
                   top: 0,
                   height:"100%",
                 }}
                 />


     <Agenda
             items={this.state.items}
             loadItemsForMonth={this.loadItems.bind(this)}
             selected={new Date()}
             renderItem={this.renderItem.bind(this)}
             renderEmptyData={this.renderEmptyData.bind(this)}
             rowHasChanged={this.rowHasChanged.bind(this)}
             // markingType={'period'}



             //    '2017-05-09': {textColor: '#43515c'},
             //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
             //    '2017-05-21': {startingDay: true, color: 'blue'},
             //    '2017-05-22': {endingDay: true, color: 'gray'},
             //    '2017-05-24': {startingDay: true, color: 'gray'},
             //    '2017-05-25': {color: 'gray'},
             //    '2017-05-26': {endingDay: true, color: 'gray'}}}
             // monthFormat={'yyyy'}
             // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
             style={{height:"100%",width:"100%"}}

              hideExtraDays={true}
           />

                 </View>

                   );
                 }

                 loadItems(day) {

    const newItems = {};
  Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
  this.setState({
    items: newItems
  });

}


  renderItem(item) {
    const {navigate} = this.props.navigation
    async function dateSelect(){
      if(item.name == 'NHS sample volunteer event #1 (1-2 pm)'){
        setit = new Date(dates[0])
           }
       else if(item.name == 'NHS sample volunteer event #2 (1-2 pm)'){
      setit =  new Date(dates[1])

    }
       else if(item.name == 'NHS sample volunteer event #3 (1-2 pm)'){
        setit =  new Date(dates[2])
      }
      else{
        setit = new Date(dates[2])
      }

    }


console.log(setit)
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => {
          dateSelect()

          try{
          Calendar.createEventAsync(calendartypebeat, {endDate: setit,
          startDate:setit,
          allDay:true,
          title: item.name}).then(
            alert("Your sign up for" + item.name + "was successful. please view the event in your device calendar" )
          ).then(() =>navigate('Dashboard')).then(() =>dateSelect())
        }
        catch(err) {
          console.log(err)
          alert("An error occured signing up for your event, please try again or submit a support request")
        }
        }
            }

      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyData() {
    return (
      <View style={styles.emptyDate}>
        <Text style ={{fontSize:25}}>This is an empty date! Quickly swipe right to acces the navigation dashboard</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

}


       const CustomDrawerComponent = (props) => (
         <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
           <View style={{height:150, backgroundColor: '#fff', alignItems:'center', justifyContent: 'center'}}>
             <Image source={require('./assets/vhlogo.png')} style={{height: 50, width: 50}}/>
           </View>
           <ScrollView>
             <DrawerItems {...props}/>
           </ScrollView>
         </SafeAreaView>
       )
       const Appstack = createDrawerNavigator({
         Dashboard:{
         screen:DashboardScreen
       },
         Opps :{
         screen:Myhours
       },
       Myopps:{
       screen:MyOpps
     },

   },
    {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    labelStyle: {
      fontSize: 15,
    },
  },

       }
     )


       const AppNavigator = createSwitchNavigator({
         Home: {
           screen: HomeScreen
         },
         Login:{
           screen:Loginscreen
         },
         Details:{
           screen:DetailsScreen
         },
         Dashboard:{
           screen:Appstack
         },
         Allopps:{
         screen:MyOpps
       },
       MyOpps:{
         screen:Myhours
       },




       });


    export default createAppContainer(AppNavigator);





const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: 'transparent',
   alignItems: 'center',
   justifyContent: 'center',
 },
 logo:{
   height:170,
   width:175,
   position:'absolute',
   top: "3%",
 borderColor:'#4169e1'

 },
 intromessage:{
   fontSize:33,
   fontFamily:'Futura',
   top:"10%",
 },
 NHSlogo:{
   height:"15.1%",
   width:"33.2%",
   position:'absolute',
   top:"26.5%",

 },
 NHSlogo2:{
   height:"15.1%",
   width:"33.2%",
   position:'absolute',
   top:"4%",

 },
 buttonStyle:{

   backgroundColor: 'silver',
   width:265,
   height:70,
   top:200,

 },
 buttontext:{
 fontSize: 30,
 color: '#fff',
 alignItems:'center',
},
signUpStyle:{
 width:"80%",
   backgroundColor:"#4169e1",
   borderRadius:25,
   height:50,
   alignItems:"center",
   justifyContent:"center",
   top:170
},
signUpStyle2:{
 width:"80%",
   backgroundColor:"silver",
   borderRadius:25,
   height:"6%",
   alignItems:"center",
   justifyContent:"center",
   top:"28%"
},
signUpStyle3:{
 width:"80%",
   backgroundColor:"#4169e1",
   borderRadius:25,
   height:"6%",
   alignItems:"center",
   justifyContent:"center",
   top:"13%"
},
signUpStyle4:{
 width:"80%",
   backgroundColor:"silver",
   borderRadius:25,
   height:"6%",
   alignItems:"center",
   justifyContent:"center",
   top:"12%"
},
finishsignUpStyle:{
 width:"90%",
 backgroundColor:"#fb5b5a",
 borderRadius:25,
 height:50,
 alignItems:"center",
 justifyContent:"center",
 marginTop:30,
 marginBottom:-55,
},

inputView:{
   width:"90%",
   backgroundColor:"#465881",
   borderRadius:25,
   height:"6%",
   marginBottom:"10%",
   justifyContent:"center",
   padding:20,
   top:"10%"
 },
 inputText:{
   height:50,
   color:"white"
 },
 dashboard1typebeat:{
   width:"80%",
     backgroundColor:"#fb5b5a",
     borderRadius:25,
     height:"6%",
     alignItems:"center",
     justifyContent:"center",
     top:"28%"
 },
 item:{
 backgroundColor: 'white',
    flex: 1,
    borderRadius: 15,
    padding: 25,
    marginRight: 10,
    marginTop: 17,

  },
  emptyDate: {
    height: 115,
    flex:1,
    paddingTop: 30
  }

});
