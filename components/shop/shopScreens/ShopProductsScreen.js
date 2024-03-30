import React, { useContext, useEffect, useState } from "react";
import { Image, StatusBar, View, ScrollView } from "react-native"; // Importez ScrollView pour rendre la liste scrollable
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { SearchBar } from 'react-native-elements';
import logo from "./../../../assets/logo.png";
import colors from "../../../assets/colors";
import { AuthContext } from "../../AuthContext";
import ShopNavbar from '../shopComponents/ShopNavbar';
import ProductCard from './../../ProductCard';
import ShopProduct from "../shopComponents/ShopProduct";

const ShopProductsScreen = ({ navigation }) => {
    const { token, updateToken } = useContext(AuthContext);

    //TODO recuperer le token du magasin 
    //const [products, setProducts] = useState([]);

    /*useEffect(() => {
        // Fonction pour récupérer les produits du magasin
        const fetchShopProducts = async () => {
            try {
                // Assurez-vous d'ajuster l'URL en fonction de votre API
                const response = await fetch(`http://localhost:8080/api/product/shop/${token}`);
                if (response.ok) {
                    const data = await response.json();
                    // Mettez à jour l'état avec les produits récupérés
                    setProducts(data.products);
                } else {
                    console.error('Erreur lors de la récupération des produits');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des produits : ', error);
            }
        };

        // Appelez la fonction pour récupérer les produits lorsque le composant est monté
        fetchShopProducts();
    }, [token]); // Assurez-vous de passer [token] comme dépendance pour que cette requête soit effectuée à chaque changement de token
     */
    const products = [
        {
            id: 1,
            name: 'Product 1',
            description: 'Description du produit 1',
            imageUrl: 'https://i-sam.unimedias.fr/2023/02/09/istock-1222018207.jpg?auto=format%2Ccompress&crop=faces&cs=tinysrgb&fit=crop&h=501&w=890',
            price: '$10.00',
            quantity: 5,
        },
        {
            id: 2,
            name: 'Product 2',
            description: 'Longue description pour le produit numero 2',
            imageUrl: 'https://leblogdulait.fr/wp-content/uploads/2015/06/bouteils-de-lait.jpg',
            price: '$15.00',
            quantity: 0,
        },
    ];

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={colors.primary}
            />
            <View style={styles.head} >
              <Image source={logo} style={styles.logo} />
              <Text style={styles.title}>Products</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <View>

                    {products.map(product => (
                        <ShopProduct
                            key={product.id}
                            navigation={navigation}
                            imageUrl={product.imageUrl}
                            name={product.name}
                            quantity={product.quantity}
                            price={product.price}
                            description={product.description}
                        />
                    ))}
                </View>

            </ScrollView>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5, 
        paddingBottom: "25%", 
        backgroundColor: colors.background,
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
        alignItems: 'center',
        backgroundColor: colors.background,
        position: 'sticky',
        top: 0,
        zIndex: 1, 
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
    },
});

export default ShopProductsScreen;
