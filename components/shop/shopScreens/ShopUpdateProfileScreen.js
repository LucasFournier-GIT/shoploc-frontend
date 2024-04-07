import React, {useContext, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import colors from '../../../assets/colors';
import ShopNavbar from "../shopComponents/ShopNavbar";
import logo from "../../../assets/logo.png";
import {AuthContext} from "../../AuthContext";
import {backendUrl} from "../../../assets/backendUrl";

const ShopUpdateProfile = ({ route, navigation }) => {

    const[shopInfo, setShopInfo] = useState(route.params.shop);
    const { token, updateToken } = useContext(AuthContext);

    const [id, setId] = useState(shopInfo.id)
    const [nom, setNom] = useState(shopInfo.name);
    const [adresse, setAdresse] = useState(shopInfo.address);
    const [mail, setMail] = useState(shopInfo.email);
    const [coordonneesGPS, setCoordonneesGPS] = useState(shopInfo.gps_coordinates);
    const [horaires, setHoraires] = useState(shopInfo.opening_hours);
    const [motDePasse, setMotDePasse] = useState(shopInfo.password);
    const [imageUrl, setImageUrl] = useState(shopInfo.image_url);

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/shop/${id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nom,
                    address: adresse,
                    email: mail,
                    gps_coordinates: coordonneesGPS,
                    opening_hours: horaires,
                    password: motDePasse,
                    image_url: imageUrl,
                }),
            });
            if (response.ok) {
                console.log('Magasin mis à jour avec succès');
                await route.params.refreshProfile();
                navigation.navigate('ShopProfileScreen');
            } else {
                console.error('Erreur lors de la mise à jour du magasin');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du magasin : ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>Mon commerce</Text>
                <View/>
            </View>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
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
                    <Image source={{ uri: imageUrl }} style={styles.image} />
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
        top: 0,
        zIndex: 1,
        backgroundColor: colors.background,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        alignSelf: 'center',
    },
    formContainer: {
        borderRadius: 10,
        backgroundColor: '#FFF',
        padding: 15,
        width: '90%',
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
        borderRadius: 50,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image:{
        width:100,
        height:100,
        alignSelf: 'center',
        marginVertical: 10,
    }
});

export default ShopUpdateProfile;
