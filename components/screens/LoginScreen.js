
import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import colors from "./../../assets/colors";
import { AuthContext } from '../AuthContext';
import CustomModal from '../CustomModal';
import {RadioButton} from 'react-native-paper';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEmailChange = (value) => { setEmail(value); };
  const handlePasswordChange = (value) => { setPassword(value); };
  const { updateToken } = useContext(AuthContext);
  const [userType, setUserType] = useState('client');

  const handleUserTypeChange = (value) => { setUserType(value); };

  const backendUrl = "https://shoploc-9d37a142d75a.herokuapp.com";

  const handleConnexion = async () => {

    switch (userType) {
      case "client":
        try {
          const response = await fetch(`${backendUrl}/api/auth/authenticate`, {
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
            updateToken(receivedToken);
            console.log('Token reçu : ', receivedToken);
            navigation.navigate('HomeScreen');
          }else if (response.status === 403) {
            setIsModalVisible(true);
          }else {
            console.error('La requête a échoué');
          }
        } catch (error) {
          console.error('Erreur lors de la requête : ', error);
        }
        break;
      case "shop":
        try {
          const response = await fetch(`${backendUrl}/api/auth/authenticate`, {
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
            updateToken(receivedToken);
            console.log('Token reçu : ', receivedToken);
            navigation.navigate('ShopProductsScreen');

          }else if (response.status === 403) {
            setIsModalVisible(true);
          }else {
            console.error('La requête a échoué');
          }
        } catch (error) {
          console.error('Erreur lors de la requête : ', error);
        }
        break;
      case "admin":
          try {
            const response = await fetch(`${backendUrl}/api/auth/authenticate`, {
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
              updateToken(receivedToken);
              console.log('Token reçu : ', receivedToken);
              navigation.navigate('HomeCityScreen');

            }else if (response.status === 403) {
              setIsModalVisible(true);
            }else {
              console.error('La requête a échoué');
            }
          } catch (error) {
            console.error('Erreur lors de la requête : ', error);
          }
          break;
        default:
        console.error('Erreur lors de la requête : Mauvais userType selectionné');
        break;
      }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bienvenue</Text>
      <View style={styles.content}>
      <CustomModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        modalText={"Erreur lors de l'authentification"}
      />
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
        <View style={styles.radioButtonGroup}>

          <RadioButton.Group onValueChange={handleUserTypeChange} value={userType}>
            <View style={styles.radioButton}>
              <RadioButton value="admin" color={colors.primary} />
              <Text style={styles.radioButtonLabel}>Se connecter en tant que ville</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton value="shop" color={colors.primary} />
              <Text style={styles.radioButtonLabel}>Se connecter en tant que magasin</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton value="client" color={colors.primary} />
              <Text style={styles.radioButtonLabel}>Se connecter en tant que client</Text>
            </View>
          </RadioButton.Group>
        </View>

        <CustomButton text={"Se connecter "}  onPress={handleConnexion}/>
        <Text style={styles.createAccountText}>
          Pas de compte ? <Text style={styles.createAccountLink} onPress={() => navigation.navigate('RegisterScreen')}>Créer un compte</Text>
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
  },
  radioButtonGroup: {
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioButtonLabel: {
    marginLeft: 10,
  },
});

export default LoginScreen;
