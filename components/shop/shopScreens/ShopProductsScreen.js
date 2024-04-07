import React, { useContext, useEffect, useState } from "react";
import {Image, View, ScrollView, Pressable} from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import logo from "./../../../assets/logo.png";
import colors from "../../../assets/colors";
import { AuthContext } from "../../AuthContext";
import ShopNavbar from '../shopComponents/ShopNavbar';
import ShopProduct from "../shopComponents/ShopProduct";
import {backendUrl} from "../../../assets/backendUrl";
import {useFocusEffect} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";

const ShopProductsScreen = ({ navigation }) => {
    const { token, updateToken } = useContext(AuthContext);
    const [shopId, setShopId] = useState(0);
    const [products, setProducts] = useState([]);

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
                        setShopId(data.id);
                    } else {
                        console.error('Error fetching user:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            };

        fetchUserData();
        }, [token]);

    useFocusEffect(
        React.useCallback(() => {
        const fetchShopProducts = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/product/shop/${shopId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Liste des produits mise à jour", data)
                    setProducts(data);
                }
                } catch (error) {
                    console.error('Erreur lors de la récupération des produits : ', error);
                }
            };
            fetchShopProducts();
        }, [shopId])
    );

    const handleAddProduct = () => {
        navigation.navigate('CreateProductScreen', { shopId });
    };

    return (
        <View style={styles.container}>
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>Produits</Text>
                <View/>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {products.map(product => (
                    <ShopProduct
                        key={product.id}
                        product={product}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
            <Pressable style={styles.addButton} onPress={handleAddProduct}>
                <Ionicons name="add" size={32} color="white" />
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
    },
    addButton: {
        position: 'sticky', // Position absolue pour le rendre fixe
        right: 20, // Positionné à droite
        alignSelf: 'flex-end',
        bottom: 80, // Positionné au-dessus de la navbar
        width: 60,
        height: 60,
        borderRadius: 50, // Pour le rendre circulaire
        backgroundColor: colors.secondary, // Couleur de fond
        justifyContent: 'center', // Centrer l'icône verticalement
        alignItems: 'center', // Centrer l'icône horizontalement
        elevation: 10, // Pour Android
        shadowColor: '#000', // Pour iOS
        shadowOffset: { width: 0, height: 2 }, // Pour iOS
        shadowOpacity: 0.25, // Pour iOS
        shadowRadius: 3.84, // Pour iOS
    },
});

export default ShopProductsScreen;
