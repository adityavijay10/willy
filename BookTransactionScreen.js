import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';
import db from '../config';
export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal',
        scannedBookId:'',
        scannedStudentId:'',
      }
    }
handleTransaction=async()=>{
var transactionMessage;
db.collection(books).doc(this.state.scannedBookId)
.get()
.then((doc)=>{
  console.log(doc.data())
})
}
    // getCameraPermissions = async () =>{
    //   const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
    //   this.setState({
    //     /*status === "granted" is true when user has granted permission
    //       status === "granted" is false when user has not granted the permission
    //     */
    //     hasCameraPermissions: status === "granted",
    //     buttonState: 'clicked',
    //     scanned: false
    //   });
    // }

    // handleBarCodeScanned = async({type, data})=>{
    //   this.setState({
    //     scanned: true,
    //     scannedData: data,
    //     buttonState: 'normal',
    //   });
    // }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState} = this.state

      if(buttonState==="BookID"){
        this.setState({
          scanned: true,
          scannedBookId: data,
          buttonState: 'normal'
        });
      }
      else if(buttonState==="StudentID"){
        this.setState({
          scanned: true,
          scannedStudentId: data,
          buttonState: 'normal'
        });
      }
      
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
            <View> 
              <Image 
                source={require("../assets/booklogo.jpg")}
              />
              <Text style={{textAlign:"center",fontSize:30,}}>

              wily          
              </Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                  style = {styles.inputBox}
                  placeholder ="BookID"
                  value={this.state.scannedBookId}
              />
              <TouchableOpacity 
                style = {styles.scanButton}
                onPress={this.getCameraPermissions("BookID")}
              
              >
                <Text style = {styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            <View style={styles.inputView}>
              <TextInput
                  style = {styles.inputBox}
                  placeholder ="StudentID"
                  value={this.state.scannedStudentId}
              />
              <TouchableOpacity 
                style = {styles.scanButton}
                onPress={this.getCameraPermissions("StudentID")}
              
              >
                <Text style = {styles.buttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={async()=>{this.handleTransaction}}>
              <Text style = {styles.submitButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>

          {/* <Text style={styles.displayText}>{
            hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
          }</Text>     

          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity> */}
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitButton:{
      backgroundColor: '#FBC02D',
      width: 100,
      height:50
    },
    submitButtonText:{
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight:"bold",
      color: 'white'
    }
  });