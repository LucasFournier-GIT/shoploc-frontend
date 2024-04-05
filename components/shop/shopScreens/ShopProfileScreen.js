import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';
import colors from '../../../assets/colors';
import ShopNavbar from "../shopComponents/ShopNavbar";
import logo from "../../../assets/logo.png";
import {AuthContext} from "../../AuthContext";

const ShopProfileScreen = ({navigation}) => {
    const [shopId, setShopId] = useState(0);
    const { token, updateToken } = useContext(AuthContext);
    const [shop, setShop] = useState({});


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setShopId(data.id)
                } else {
                    console.error('Error fetching user:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUserData();
    }, [token]);

    const testShopId = 202;

    const refreshProfile = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/shop/${testShopId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setShop(data);
            } else {
                console.error('Error fetching user:', response.status);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        refreshProfile();
    }, [testShopId, token]);

    const handleEditProfile = () => {
        navigation.navigate('ShopUpdateProfileScreen', { shop, refreshProfile });
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
                    <Image source={{ uri: shop.image_url }} style={styles.image} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>ID:</Text>
                        <Text style={styles.value}>{shop.id}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Nom:</Text>
                        <Text style={styles.value}>{shop.name}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Adresse:</Text>
                        <Text style={styles.value}>{shop.address}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Mail:</Text>
                        <Text style={styles.value}>{shop.email}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Coordonnées GPS:</Text>
                        <Text style={styles.value}>{shop.gps_coordinates}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Horaires:</Text>
                        <Text style={styles.value}>{shop.opening_hours}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Mot de passe:</Text>
                        <Text style={styles.value}>**************</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Image URL:</Text>
                        <Text style={styles.value}>{shop.image_url}</Text>
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
    },
    image:{
        width:100,
        height:100,
        alignSelf:"center"
    }
});

export default ShopProfileScreen;
