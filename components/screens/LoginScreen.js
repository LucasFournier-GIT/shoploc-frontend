import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import { useNavigation } from '@react-navigation/native';
import colors from "./../../assets/colors";

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (value) => { setEmail(value); };
  const handlePasswordChange = (value) => { setPassword(value); };

  const handleConnexion = async () => {
    console.log(email);
    console.log(password);
    try {
      const response = await fetch('http://localhost:8080/api/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const receivedToken = data.token;
        setToken(receivedToken);
        console.log('Token reçu : ', receivedToken);
        // Naviguer vers la prochaine vue après la connexion réussie
        navigation.navigate('HomeScreen');
      } else {
        console.error('La requête a échoué');
      }
    } catch (error) {
      console.error('Erreur lors de la requête : ', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bienvenue</Text>
      <View style={styles.content}>
        <Text style={styles.heading2}>Connexion</Text>
        <CustomInput
          type={"email-address"}
          label={"Votre adresse email"}
          placeholder={"Entrez votre adresse email"}
          onChange={handleEmailChange}
        />
        <CustomInput
          type={"password"}
          label={"Votre mot de passe"}
          placeholder={"Entrez votre mot de passe"}
          onChange={handlePasswordChange} 
        />
        <CustomButton text={"Se connecter"}  onPress={handleConnexion}/>
        <Text style={styles.createAccountText}>
          Pas de compte ? <Text style={styles.createAccountLink} onPress={() => navigation.navigate('CreateAccountScreen')}>Créer un compte</Text>
        </Text>
        <Text style={styles.footer}>
            ShopLoc by SEQI
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  heading: {
    fontSize: 39,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: colors.background,
    //fontFamily: 'LilyScriptOne-Regular',
  },
  heading2: {
    color: colors.primary,
    //fontFamily: 'LilyScriptOne-Regular',
    fontSize: 26,
    marginBottom: 15
  },
  content:{
    flex: 1,
    width:'100%',
    backgroundColor: colors.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding:'10%',
    
  },
  createAccountText: {
    marginTop: 10,
    color: colors.primary,
    fontSize: 15,
    alignSelf: 'flex-end', 
  },
  createAccountLink: {
    fontWeight: 'bold',
    color: colors.secondary,

  },
  footer :{
    color: colors.primary,
    position:'absolute',
    bottom:10,
    alignSelf:'center'
  }
});

export default LoginScreen;
