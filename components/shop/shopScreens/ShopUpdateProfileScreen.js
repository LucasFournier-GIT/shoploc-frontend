import React, {useContext, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import colors from '../../../assets/colors';
import ShopNavbar from "../shopComponents/ShopNavbar";
import logo from "../../../assets/logo.png";
import {AuthContext} from "../../AuthContext";

const ShopUpdateProfile = ({ route, navigation }) => {
    const { shopInfo } = route.params;
    const { token, updateToken } = useContext(AuthContext);

    const [nom, setNom] = useState(shopInfo.nom);
    const [adresse, setAdresse] = useState(shopInfo.adresse);
    const [mail, setMail] = useState(shopInfo.mail);
    const [coordonneesGPS, setCoordonneesGPS] = useState(shopInfo.coordonnees_gps);
    const [status, setStatus] = useState(shopInfo.status);
    const [horaires, setHoraires] = useState(shopInfo.horaire);
    const [motDePasse, setMotDePasse] = useState(shopInfo.mot_de_passe);
    const [imageUrl, setImageUrl] = useState(shopInfo.image_url);

    const handleSaveChanges = () => {
        // TODO Enregistrer les modifications du formulaire ici
    };

    return (
        <View style={styles.container}>
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text>Modifier le profil</Text>
            </View>

            <ScrollView>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        value={nom}
                        onChangeText={setNom}
                        placeholder="Nom du magasin"
                    />
                    <TextInput
                        style={styles.input}
                        value={adresse}
                        onChangeText={setAdresse}
                        placeholder="Adresse du magasin"
                    />
                    <TextInput
                        style={styles.input}
                        value={mail}
                        onChangeText={setMail}
                        placeholder="Mail du magasin"
                    />
                    <TextInput
                        style={styles.input}
                        value={coordonneesGPS}
                        onChangeText={setCoordonneesGPS}
                        placeholder="Coordonnées GPS"
                    />
                    <TextInput
                        style={styles.input}
                        value={status}
                        onChangeText={setStatus}
                        placeholder="Status du magasin"
                    />
                    <TextInput
                        style={styles.input}
                        value={horaires}
                        onChangeText={setHoraires}
                        placeholder="Horaires du magasin"
                    />
                    <TextInput
                        style={styles.input}
                        value={motDePasse}
                        onChangeText={setMotDePasse}
                        placeholder="Mot de passe du magasin"
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={setImageUrl}
                        placeholder="URL de l'image du magasin"
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                        <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <ShopNavbar navigation={navigation} screen={"ShopProfileScreen"} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 15,
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 3,
        borderBottomColor: colors.primary,
    },
    logo: {
        width: 50,
        height: 50,
        margin: 15,
        marginRight: 0
    },
    formContainer: {
        borderRadius: 10,
        backgroundColor: '#FFF',
        padding: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ShopUpdateProfile;
