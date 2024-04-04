import React, { useContext, useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from './../../AuthContext';
import ShopNavbar from "../shopComponents/ShopNavbar";
import ShopProductsScreen from "./ShopProductsScreen";
import logo from "../../../assets/logo.png";
import colors from "../../../assets/colors";

const ShopUpdateProduct = ({ route, navigation }) => {
    const { token, updateToken } = useContext(AuthContext);
    const {product, refreshProducts} = route.params;
    const [ id, setId ] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [availability, setAvailability] = useState(product.availability);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);

    const handleUpdateProduct = async () => {
        try {
            console.log(name, availability, price, description, imageUrl);
            const response = await fetch(`http://localhost:8080/api/product/${id}`, {
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
                await refreshProducts();
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
            const response = await fetch(`http://localhost:8080/api/product/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                console.log('Produit supprimé avec succès');
                await refreshProducts();
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
                <Text style={styles.title}>Mes produits</Text>
            </View>

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
                style={[styles.input, styles.input]}
                value={imageUrl}
                onChangeText={setImageUrl}
                placeholder="UR de l'image"
            />
            <Image
                source={imageUrl ? { uri: imageUrl } : require('../../assets/logo.png')}
                style={styles.image}
            />
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText} onPress={handleUpdateProduct} s>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteProduct}>
                <Text style={styles.deleteButtonText}>Supprimer le produit</Text>
            </TouchableOpacity>

            <ShopNavbar navigation={navigation} screen={"ShopProductsScreen"}></ShopNavbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
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
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        position: 'sticky',
        top: 0,
        zIndex: 1,
    },
    logo: {
        width: 50,
        height: 50,
        margin: 15,
        marginRight: 0
    },
    deleteButton: {
        backgroundColor: colors.error,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        position: 'absolute',
        bottom: 85,
        left: 20,
        right: 20,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },

});

export default ShopUpdateProduct;
