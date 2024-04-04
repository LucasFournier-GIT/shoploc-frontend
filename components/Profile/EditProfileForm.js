import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import colors from "../../assets/colors";

const EditProfileForm = ({userInfo, onFormSubmit}) => {
    const [email, setEmail] = useState(userInfo.email);
    const [carRegistrationNumber, setCarRegistrationNumber] = useState(userInfo.carRegistrationNumber || '');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log('handleSubmit a été appelé');

        let updatedFields = {};

        if (email !== userInfo.email) {
            updatedFields.email = email;
        }

        if (carRegistrationNumber !== (userInfo.carRegistrationNumber || '')) {
            updatedFields.carRegistrationNumber = carRegistrationNumber;
        }

        if (password !== '') {
            updatedFields.password = password;
        }

        onFormSubmit(updatedFields);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email :</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <Text style={styles.text}>Immatriculation :</Text>
            <TextInput
                style={styles.input}
                value={carRegistrationNumber}
                onChangeText={setCarRegistrationNumber}
            />
            <Text style={styles.text}>Mot de passe:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={{color: 'white', fontSize: 16}}>Valider</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
    text: {
        fontSize: 16,
        color: colors.primary,
        marginBottom: 10,
    },
    submitButton: {
        borderRadius: 50,
        backgroundColor: colors.secondary,
        padding: 10,
        marginTop: 20,
        shadowColor: "black",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.50,
        alignItems: 'center',
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
});

export default EditProfileForm;
