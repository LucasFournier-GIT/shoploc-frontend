import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Linking, Pressable} from 'react-native';
import colors from '../../../assets/colors';
import ShopNavbar from "../shopComponents/ShopNavbar";
import logo from "../../../assets/logo.png";
import {AuthContext} from "../../AuthContext";
import {backendUrl} from "../../../assets/backendUrl";

const ShopProfileScreen = ({navigation}) => {
    const [shopId, setShopId] = useState(0);
    const { token, updateToken } = useContext(AuthContext);
    const [shop, setShop] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/user`, {
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

    const refreshProfile = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/shop/${shopId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
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
    }, [shopId, token]);

    const handleEditProfile = () => {
        navigation.navigate('ShopUpdateProfileScreen', { shop, refreshProfile });
    };

    const handleGoPBI = () => {
        const url = "https://app.powerbi.com/view?r=eyJrIjoiODIyOTQ5ZjItZWI4OC00NjVhLTk4N2MtM2JlYWE0NzhiMDMzIiwidCI6IjIyMTNkOWRmLWNlZDYtNGIwYi1hMjUwLWVlOGQxOWZiY2M5YiIsImMiOjh9"
        Linking.openURL(url);
    }

    return (
        <View style={styles.container}>
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>Mon commerce</Text>
                <View/>
            </View>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
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
                    <Pressable style={styles.pbiButton} onPress={handleGoPBI}>
                        <Text style={styles.editButtonText}>Plus d'informations</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.editButton} onPress={handleEditProfile}>
                    <Text style={styles.editButtonText}>Modifier</Text>
                </Pressable>
            </ScrollView>
            <ShopNavbar navigation={navigation} screen={"ShopProfileScreen"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    profileContainer: {
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
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {
        flex: 1,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary,
        padding: 20,
        borderRadius: 50,
        marginVertical: 20,
        width: '90%',
    },
    pbiButton:{
        backgroundColor: colors.secondary,
        paddingVertical: 15,
        borderRadius: 50,
        alignItems: 'center',
        margin:10
    },
    editButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
    image:{
        width:100,
        height:100,
        alignSelf:"center"
    }
});

export default ShopProfileScreen;
