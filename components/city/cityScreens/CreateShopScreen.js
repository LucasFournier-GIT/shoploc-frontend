import React, {useContext, useState} from "react";
import {Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import logo from "../../../assets/logo.png";
import colors from "../../../assets/colors";
import {AuthContext} from '../../AuthContext';
import CustomModal from "../../CustomModal";
import {backendUrl} from "../../../assets/backendUrl";

const CreateShopScreen = ({ navigation }) => {
    const { token, updateToken } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [shopEmail,setShopEmail] = useState('');
    const [shopName,setShopName] = useState('');
    const [shopAddress,setShopAddress] = useState('');
    const [shopGps,setShopGps] = useState('');
    const [shopOpening,setShopOpening] = useState('');
    const [shopImage,setShopImage] = useState('');

    const [modalText, setModalText] = useState('Erreur');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getUserId = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/user/${email}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }

            return await response.json();
        } catch (error) {
            console.error('Erreur lors de l\'appel de getUserId : ', error);
        }
    }


    const handleSubmit = async () => {
        if (!email || !shopEmail || !shopName || !shopAddress || !shopGps || !shopOpening || !shopImage) {
            setModalText("Des informations sont manquantes");
            setIsModalVisible(true);
            return;
        }

        const regex = /^\d{2}:\d{2}-\d{2}:\d{2}$/;
        if (!regex.test(shopOpening)) {
            setModalText("Les horaires doivent être au format hh:mm-hh:mm (ex : 09:00-17:00)");
            setIsModalVisible(true);
            return;
        }

        let userId = await getUserId();

        let shopInfo = {
            id: userId,
            name: shopName,
            image_url: shopImage,
            address: shopAddress,
            email: shopEmail,
            gps_coordinates: shopGps,
            opening_hours: shopOpening,
        };

        await submitAddShop(shopInfo);
    };

    const submitAddShop = async (shopInfo) => {
        try {
            const response = await fetch(`${backendUrl}/api/shop`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shopInfo)
            });

            if (response.status === 409) {
                setModalText("Ce magasin existe déjà");
                setIsModalVisible(true);
                throw new Error('Erreur lors de la requête');
            }

            if (!response.ok) {
                setModalText("Erreur lors de l'inscription");
                setIsModalVisible(true);
                throw new Error('Erreur lors de la requête');
            }

            navigation.navigate('HomeCityScreen'); //TODO verifier la mise à jour des composants de la liste
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
                        <Text style={styles.containerTitle}>Information du propriétaire</Text>
                        <View>
                            <Text style={styles.text}>Adresse mail</Text>
                            <TextInput
                                style={[styles.input, (!email && styles.inputError)]}
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.containerTitle}>Informations du magasin</Text>
                        <View>
                            <Text style={styles.text}>Nom</Text>
                            <TextInput
                                style={[styles.input, (!shopName && styles.inputError)]}
                                onChangeText={setShopName}
                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Email du magasin</Text>
                            <TextInput
                                style={[styles.input, (!shopEmail && styles.inputError)]}
                                onChangeText={setShopEmail}
                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Adresse</Text>
                            <TextInput
                                style={[styles.input, (!shopAddress && styles.inputError)]}
                                onChangeText={setShopAddress}
                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Coordonnées GPS</Text>
                            <TextInput
                                style={[styles.input, (!shopGps && styles.inputError)]}
                                onChangeText={setShopGps}
                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Horaires d'ouverture (au format HH:MM-HH:MM)</Text>
                            <TextInput
                                style={[styles.input, (!shopOpening && styles.inputError)]}
                                onChangeText={setShopOpening}
                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Url de votre image</Text>
                            <TextInput
                                style={[styles.input, (!shopImage && styles.inputError)]}
                                onChangeText={setShopImage}
                            />
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

export default CreateShopScreen;
