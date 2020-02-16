import React, { useState } from 'react';
import { Text,TextInput, StyleSheet, View,  KeyboardAvoidingView, Image, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error_message, setError] = useState("");

  const loginHandle = () => {
    auth().signInWithEmailAndPassword(email, password).catch((e)=>setError(e.message));
  };

  /*async function loginHandle() {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.error(e.message);
    }
  }*/
  /*        <Image 
        source={require('../../assets/Cemal1.png')}
        style={styles.cemal2}
      />*/

    return (
    <ScrollView>
    <KeyboardAvoidingView behavior="padding" style={styles.containerN}>
      <View style={styles.imageContainer}>

      </View>
      
      <View style={styles.container}>
      
    <Text style={styles.error_text}>{error_message}</Text>

      <TextInput 
          placeholder='mail'
          placeholderTextColor= 'rgba(255,255,255,1.0)'
          keyboardType= "email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={e => { setEmail(e); }}
          value={email}
          style={styles.T_Input} />
    
  
      <TextInput 
          placeholder='password'
          placeholderTextColor= 'rgba(255,255,255,1.0)'
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={event => { setPassword(event); }}
          value={password}
          style={styles.T_Input} />

      
      <TouchableOpacity style={styles.text_container} onPress={() => loginHandle()}>
        <Text style={styles.button_text}>Login</Text>
      </TouchableOpacity>
  
      </View>
  


      <TouchableOpacity onPress ={() => navigation.navigate('SignUp')} style={styles.sign_button} >
      <Text style={styles.sign_button_text}>SignUp</Text>
      </TouchableOpacity>


    </KeyboardAvoidingView>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  containerN: {
    flex: 1
    
  },
  imageContainer:{
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  error_text: {
    padding: 5,
    textAlign: 'center',
    color: '#E83E0C'
    
  },
  sign_button: {
    
  },
  sign_button_text: {
    textAlign: 'center',
    color: '#000000'
  },
  cemal2: {
    width: 300,
    height: 300
    
  },
  container: {
    padding: 20
    
  },
  T_Input: {
    height: 40,
    backgroundColor: 'rgba(255,196,255,1.0)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10
  },
  text_container: {
    backgroundColor: 'rgba(120,179,120,0.6)',
    padding: 15,
    

  },
  button_text:{
    textAlign: 'center',
    color: '#FFFFFF'
  }, 

});

export default LoginScreen;