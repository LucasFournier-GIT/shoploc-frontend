import React, { useContext, useState } from 'react';
import {View, Text, TextInput, StyleSheet, Image, ScrollView, Pressable} from 'react-native';
import { AuthContext } from '../../AuthContext';
import ShopNavbar from "../shopComponents/ShopNavbar";
import logo from "../../../assets/logo.png";
import colors from "../../../assets/colors";
import {backendUrl} from "../../../assets/backendUrl";

const ShopUpdateProduct = ({ route, navigation }) => {
    const { token, updateToken } = useContext(AuthContext);
    const { product } = route.params;

    const [id, setId] = useState(product.id);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [name, setName] = useState(product.name);
    const [availability, setAvailability] = useState(product.availability);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);

    const handleUpdateProduct = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/product/${id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    availability: parseInt(availability),
                    price: parseFloat(price),
                    description,
                    imageUrl
                }),
            });
            if (response.ok) {
                console.log('Produit mis à jour avec succès');
                navigation.navigate("ShopProductsScreen");
            } else {
                console.error('Erreur lors de la mise à jour du produit');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit : ', error);
        }
    };

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Chargement en cours...</Text>
            </View>
        );
    }

    const handleDeleteProduct = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/product/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                console.log('Produit supprimé avec succès');
                navigation.navigate("ShopProductsScreen");
            } else {
                console.error('Erreur lors de la suppression du produit');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du produit : ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>Mon produit</Text>
                <View/>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.textGroup}>
                    <Text style={styles.title}>Modifier le produit</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nom du produit"
                    />
                    <TextInput
                        style={styles.input}
                        value={availability}
                        onChangeText={setAvailability}
                        placeholder="Quantité"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={setPrice}
                        placeholder="Prix"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Description"
                        multiline={true}
                    />
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={setImageUrl}
                        placeholder="URL de l'image du produit"
                    />
                    <Image source={imageUrl} style={styles.image}/>
                </View>
                <Pressable style={styles.button} onPress={handleUpdateProduct}>
                    <Text style={styles.buttonText}>Enregistrer</Text>
                </Pressable>
                <Pressable style={styles.deleteButton} onPress={handleDeleteProduct}>
                    <Text style={styles.deleteButtonText}>Supprimer le produit</Text>
                </Pressable>
            </ScrollView>
            <ShopNavbar navigation={navigation} screen={"ShopProductsScreen"}></ShopNavbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
    },
    textGroup: {
        width: '90%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color:colors.primary,
        alignContent:"center"
    },
    input: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: colors.secondary,
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
    },
    deleteButton: {
        backgroundColor: colors.error,
        padding: 15,
        borderRadius: 50,
        marginVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
    image:{
        height:100,
        width:100,
        marginVertical:10,
        alignSelf:"center"
    }
});

export default ShopUpdateProduct;
