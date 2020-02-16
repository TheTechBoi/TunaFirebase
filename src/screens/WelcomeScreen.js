import React, {useState} from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import DialogInput from 'react-native-dialog-input';
import funcFire from '../functions/funcFire';



const WelcomeScreen = ({ navigation: { navigate }}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [friendReturn, setFriendReturn] = useState("");


  const SignOut = () => {
    auth().signOut();
  };

  const addingFriend = (friendName) => {
    funcFire.addFriend(friendName).then(() => {
      setFriendReturn(funcFire.ADDresult)
    })
    
  }

  const addFriendClose = () => {
    setFriendReturn("")
    setDialogVisible(false)
    console.log('byee')
  }


  return(
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {auth().currentUser.displayName}</Text>

      <TouchableOpacity style={styles.main_button} onPress={()=>navigate("Bespoke")}>
        <Text style={styles.main_button_text}>Go To BespokeScreen</Text>
        </TouchableOpacity>

          <DialogInput isDialogVisible={dialogVisible}
            title={"Add Friend"}
            message={friendReturn}
            hintInput={'FriendName'}
            cancelText={'Close'}
            submitText={'Add'}
            submitInput={e =>  addingFriend(e)}
            closeDialog={() => addFriendClose()}>
          </DialogInput>
          
      <TouchableOpacity style={styles.main_button} onPress={()=>navigate("Friends")}>
        <Text style={styles.main_button_text}>Go To Friends</Text>
      </TouchableOpacity>
        

      <TouchableOpacity style={styles.main_button} onPress={()=>setDialogVisible(true)}>
        <Text style={styles.main_button_text}>Add Friend</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.main_button} onPress={()=>navigate("Requests")}>
        <Text style={styles.main_button_text}>Go To Requests</Text>
        </TouchableOpacity>

      <TouchableOpacity style={styles.sign_button} onPress={()=>SignOut()}>
        <Text style={styles.sign_button_text}>Logout</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    text: {
      fontSize: 30,
      padding: 30,
      alignSelf: 'center'
  },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
      main_button: {
        backgroundColor: 'rgba(120,179,120,0.8)',
        padding: 15,
    },
      sign_button: {
        padding: 30
    },
      sign_button_text: {
        textAlign: 'center',
        color: '#000000'
      },
      main_button_text: {
        fontSize: 15,
        textAlign: 'center',
        color: '#000000'
    }
});

export default WelcomeScreen;
