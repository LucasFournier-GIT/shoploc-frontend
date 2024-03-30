import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from './../../AuthContext';
import ShopNavbar from "../shopComponents/ShopNavbar";
import ShopProductsScreen from "./ShopProductsScreen";

const ShopUpdateProduct = ({ route, navigation }) => {
    const { token, updateToken } = useContext(AuthContext);
    const { id } = route.params;

    console.log(token);

    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/product/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response;
                    console.log("data", response);
                    setProduct(data);
                    setName(data.name);
                    setQuantity(data.quantity.toString());
                    setPrice(data.price.toString());
                    setDescription(data.description);
                } else {
                    console.error('Erreur lors de la récupération des informations du produit');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des informations du produit : ', error);
            }
        };

        fetchProductData();
    }, [id, token]);

    const handleUpdateProduct = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/product/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    quantity: parseInt(quantity),
                    price: parseFloat(price),
                    description,
                }),
            });
            if (response.ok) {
                console.log('Produit mis à jour avec succès');
                // Rediriger vers une autre page ou effectuer une action supplémentaire si nécessaire
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifier le produit</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nom du produit"
            />
            <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
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
            <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
                <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
            <ShopNavbar navigation={navigation} screen={"ShopProductsScreen"}></ShopNavbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#275C50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ShopUpdateProduct;
