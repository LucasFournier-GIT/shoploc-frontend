import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';
import colors from '../../../assets/colors';
import ShopNavbar from "../shopComponents/ShopNavbar";
import logo from "../../../assets/logo.png";

const ShopProfileScreen = ({navigation}) => {
    // Supposons que vous avez déjà les informations du magasin
    const shopInfo = {
        id: 1,
        nom: 'Exemple nom magasin',
        adresse: 'Ex Adresse du Magasin',
        mail: 'exexample@example.com',
        coordonnees_gps: 'EXX.XXXXX, EYY.YYYYY',
        status: 'ExStatus du Magasin',
        horaire: 'EXHoraires du Magasin',
        mot_de_passe: 'ExMot de passe du Magasin',
        image_url: 'ExURL de l\'image du Magasin',
    };

    // Fonction pour gérer le clic sur le bouton "Modifier"
    const handleEditProfile = () => {
        // Naviguer vers l'écran de modification du profil
        navigation.navigate('ShopUpdateProfileScreen', { shopInfo });
    };

    return (
        <View style={styles.container}>
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text>Profile</Text>
            </View>

            <ScrollView>
                <View style={styles.profileContainer}>
                    <Text style={styles.title}>Profil du Magasin</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>ID:</Text>
                        <Text style={styles.value}>{shopInfo.id}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Nom:</Text>
                        <Text style={styles.value}>{shopInfo.nom}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Adresse:</Text>
                        <Text style={styles.value}>{shopInfo.adresse}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Mail:</Text>
                        <Text style={styles.value}>{shopInfo.mail}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Coordonnées GPS:</Text>
                        <Text style={styles.value}>{shopInfo.coordonnees_gps}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Status:</Text>
                        <Text style={styles.value}>{shopInfo.status}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Horaires:</Text>
                        <Text style={styles.value}>{shopInfo.horaire}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Mot de passe:</Text>
                        <Text style={styles.value}>{shopInfo.mot_de_passe}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Image URL:</Text>
                        <Text style={styles.value}>{shopInfo.image_url}</Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <Text style={styles.editButtonText}>Modifier</Text>
            </TouchableOpacity>
            <ShopNavbar navigation={navigation} screen={"ShopProfileScreen"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 15,
    },
    profileContainer: {
        borderRadius: 32.5,
        backgroundColor: '#FFF',
        padding: 15,
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {
        flex: 1,
    },
    editButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        bottom:70
    },
    editButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
    logo: {
        width: 50,
            height: 50,
            margin: 15,
            marginRight: 0
    },
    head: {
        flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: colors.background,
            position: 'sticky',
            top: 0,
            zIndex: 1,
    }
});

export default ShopProfileScreen;
