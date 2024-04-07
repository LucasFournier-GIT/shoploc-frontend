import {View, Text, Image, ScrollView, Pressable, TextInput, StyleSheet} from "react-native";
import logo from "../../../assets/logo.png";
import ShopNavbar from "../shopComponents/ShopNavbar";
import React, {useContext, useState} from "react";
import colors from "../../../assets/colors";
import {backendUrl} from "../../../assets/backendUrl";
import {AuthContext} from "../../AuthContext";

const CreateProductScreen =  ({ route, navigation }) => {
    const { token, updateToken } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');

    const { shopId } = route.params;

    const handleAddProduct = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/product`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    categoryId: 1,
                    imageUrl: imageUrl,
                    price: price,
                    availability: availability,
                    shopId: shopId,
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }

            navigation.navigate('ShopProductsScreen');

            console.log(response.json())
        } catch (error) {
            console.error('Erreur lors de la requête : ', error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>Nouveau produit</Text>
                <View/>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Nom du produit</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Text style={styles.label}>URL illustration</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={setImageUrl}
                    />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Prix (€)</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={setPrice}
                    />
                    <Text style={styles.label}>Disponibilité (nombre de pièces)</Text>
                    <TextInput
                        style={styles.input}
                        value={availability}
                        onChangeText={setAvailability}
                    />
                </View>
            </ScrollView>
            <Pressable style={styles.submitButton} onPress={handleAddProduct}>
                <Text style={{ color: 'white'}}>Ajouter le produit</Text>
            </Pressable>
            <ShopNavbar navigation={navigation} screen="ShopProductsScreen" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollViewContent: {
        flex: 1,
        alignItems: 'center',
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
    logo:{
        width: 50,
        height: 50,
        margin:15,
    },
    submitButton: {
        borderRadius: 50,
        backgroundColor: colors.secondary,
        padding: 10,
        marginVertical: 20,
        shadowColor: "black",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.50,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    formContainer: {
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
        marginBottom: 10,
        width: '90%',
        alignSelf: 'center',
    },
    input: {
        height: 40,
        backgroundColor: "lightgrey",
        marginVertical: 10,
        padding: 10,
        paddingLeft: 20,
        borderRadius: 50,
        fontSize: 14,
    },
});

export default CreateProductScreen;
