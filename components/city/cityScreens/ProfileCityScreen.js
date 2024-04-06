import React, { useState, useEffect, useContext } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Linking, Pressable} from 'react-native';
import { AuthContext } from '../../AuthContext';
import colors from "../../../assets/colors";
import logo from "../../../assets/logo.png";
import CustomNavBar from "../../CustomNavBar";
import EditProfileForm from "../../Profile/EditProfileForm";
import {MaterialIcons} from "@expo/vector-icons";
import Config from "react-native-config";
import CityNavbar from "../cityComponents/CityNavbar";

const ProfileCityScreen = ( { navigation } ) => {
    const { token } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    //const backendUrl = Config.BACKEND_URL;
    const backendUrl = "http://localhost:8080";

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/user`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }

                const data = await response.json();
                setUserInfo(data);
            } catch (error) {
                console.error('Erreur lors de l\'appel de fetchUserInfo : ', error);
            }
        };

        fetchUserInfo().catch((error) => {console.error('Erreur lors de la récupération des données utilisateur : ', error)});
    }, [token]);

    if (!userInfo) {
        return <View style={styles.loading}>
            <Text>Chargement...</Text>
        </View>
    }

    const handleEditButtonClick = () => {
        setIsEditing(true);
    };

    const submitUserData = async (updatedFields) => {
        console.log('submitUserData a été appelé avec les champs suivants :', updatedFields);
        try {
            const response = await fetch(`${backendUrl}/api/user`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }

            const data = await response.json();
            setUserInfo(data);
            setIsEditing(false);
        } catch (e) {
            // TODO: Afficher une notif sur le front
            console.error('Erreur lors de la mise à jour des informations client : ', error);
        }
    }

    const redirectToPbi = () => {
        const url = "https://app.powerbi.com/view?r=eyJrIjoiMzJlM2MxNmItYjJlMS00ZjE0LTg5NWYtOTZjOGEyZmI1ZWFiIiwidCI6IjIyMTNkOWRmLWNlZDYtNGIwYi1hMjUwLWVlOGQxOWZiY2M5YiIsImMiOjh9"
        Linking.openURL(url);
    }

    return (
        <View style={styles.View}>
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>Mon profil</Text>
                <View/>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {isEditing && (
                    <EditProfileForm userInfo={userInfo} showCarNumber={false} onFormSubmit={submitUserData} />
                )}
                { !isEditing && (
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.headOfContainer}>{userInfo.firstname} {userInfo.lastname}</Text>
                            <Pressable style={styles.editButton} onPress={handleEditButtonClick}>
                                <MaterialIcons name="edit" size={28} color={colors.primary}/>
                            </Pressable>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.leftColumn}>
                                <Text style={styles.textLeftColumn}>Email :</Text>
                                <Text style={styles.textLeftColumn}>Mot de passe:</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text style={styles.text}>{userInfo.email}</Text>
                                <Text style={styles.text}>{'**********'}</Text>
                            </View>
                        </View>
                    </View>
                )}
                <Pressable style={styles.moreInfoButton}>
                    <Text style={{color: 'white', fontSize: 16}} onPress={redirectToPbi}>Plus d'informations</Text>
                </Pressable>
            </ScrollView>
            <CityNavbar navigation={navigation} screen="ProfileCityScreen" />
        </View>
    );
};

const styles = StyleSheet.create({
    View: {
        flex: 1,
        top: 0,
        backgroundColor: colors.background,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: 30,
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
    moreInfoButton: {
        backgroundColor: colors.secondary,
        padding: 20,
        borderRadius: 50,
        alignItems: 'center',
        margin: 20,
        marginTop: 50,
        width: '90%',
    },
    scrollViewContent: {
        alignItems: 'flex-start', // Aligne les éléments enfants au début de l'axe transversal
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
        paddingBottom: "25%",
    },
    text: {
        fontSize: 16,
        color: colors.primary,
        marginBottom: 10,
    },
    textDisabled: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    textLeftColumn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    editButton: {
        borderRadius: 50,
        padding: 8,
        shadowColor: "black",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.50,
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
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.primary,
        alignSelf: 'center',
    },
    headOfContainer: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftColumn: {
        alignItems: 'flex-start',
    },
    rightColumn: {
        alignItems: 'flex-end',
    },
    loading: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ProfileCityScreen;
