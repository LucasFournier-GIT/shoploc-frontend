import React, {useContext, useState} from "react";
import {Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import logo from "../../assets/logo.png";
import colors from "../../assets/colors";
import { AuthContext } from '../AuthContext';
import CustomModal from "../CustomModal";

const RegisterScreen = ({ navigation }) => {
    const { updateToken } = useContext(AuthContext);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [carRegistrationNumber, setCarRegistrationNumber] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');

    const backendUrl = "https://shoploc-9d37a142d75a.herokuapp.com"

    const handleSubmit = () => {
        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            setModalText("Les mots de passe saisis ne correspondent pas");
            setIsModalVisible(true);
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erreur de mot de passe', 'Les mots de passe ne correspondent pas');
            return;
        }

        let usedFields = {
            firstname,
            lastname,
            email,
            password,
            carRegistrationNumber: carRegistrationNumber ? carRegistrationNumber : null,
        };

        submitUserInfo(usedFields);
    };

    const submitUserInfo = async (usedFields) => {
        try {
            const response = await fetch(`${backendUrl}/api/auth/register/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usedFields)
            });

            if (response.status === 409) {
                setModalText("Cet utilisateur existe déjà");
                setIsModalVisible(true);
                throw new Error('Erreur lors de la requête');
            }

            if (!response.ok) {
                setModalText("Erreur lors de l'inscription");
                setIsModalVisible(true);
                throw new Error('Erreur lors de la requête');
            }

            const data = await response.json(); // Extrait les données de la réponse
            updateToken(data.token);

            navigation.navigate('HomeScreen');
        } catch (error) {
            console.error('Erreur lors de l\'appel de submitUserInfo : ', error);
        }
    };

    return (
        <View style={styles.View}>
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>Inscription</Text>
                <View/>
            </View>
            <View style={styles.content}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <Text style={styles.containerTitle}>Qui êtes-vous ?</Text>
                        <View>
                            <Text style={styles.text}>Nom *</Text>
                            <TextInput
                                style={[styles.input, (!lastname && styles.inputError)]}
                                onChangeText={setLastname}
                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Prénom *</Text>
                            <TextInput
                                style={[styles.input, (!firstname && styles.inputError)]}
                                onChangeText={setFirstname}
                            />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.containerTitle}>Contact</Text>
                        <View>
                            <Text style={styles.text}>Email *</Text>
                            <TextInput
                                style={[styles.input, (!email && styles.inputError)]}
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.containerTitle}>Confidentialité</Text>
                        <View>
                            <Text style={styles.text}>Mot de passe *</Text>
                            <TextInput
                                style={[styles.input, (!password && styles.inputError)]}
                                onChangeText={setPassword} secureTextEntry
                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Confirmer *</Text>
                            <TextInput
                                style={[styles.input, (!confirmPassword && styles.inputError)]}
                                onChangeText={setConfirmPassword} secureTextEntry
                            />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.containerTitle}>Véhicule</Text>
                        <View>
                            <Text style={styles.text}>Plaque d'immatriculation</Text>
                            <TextInput style={styles.input} onChangeText={setCarRegistrationNumber}></TextInput>
                        </View>
                    </View>
                </ScrollView>
                <Pressable style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={{color: 'white', fontSize: 16}}>S'inscrire</Text>
                </Pressable>
            </View>
            <CustomModal
                isVisible={isModalVisible}
                modalText={modalText}
                onClose={() => setIsModalVisible(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    View: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        paddingTop: 10,
        paddingBottom: 20,
        alignSelf: 'stretch'
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    container: {
        backgroundColor: "white",
        borderRadius: 20,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.50,
        padding: 20,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    logo:{
        width: 50,
        height: 50,
        margin:15,
        marginRight:0
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        backgroundColor: colors.background,
        top: 0,
        zIndex: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        alignSelf: 'center',
    },
    headOfContainer: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
    },
    containerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: colors.primary,
        marginBottom: 10,
    },
    input: {
        height: 40,
        backgroundColor: "lightgrey",
        marginBottom: 10,
        padding: 10,
        paddingLeft: 20,
        borderRadius: 50,
        fontSize: 14,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    submitButton: {
        backgroundColor: colors.secondary,
        padding: 20,
        borderRadius: 50,
        alignItems: 'center',
        margin: 20,
        width: '90%',
        position: 'sticky',
        bottom: 30,
    },
})

export default RegisterScreen;
