import React, { useContext, useEffect, useState } from "react";
import { Image, StatusBar, View, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import logo from "./../../../assets/logo.png";
import colors from "../../../assets/colors";
import { AuthContext } from "../../AuthContext";
import ShopNavbar from '../shopComponents/ShopNavbar';
import ShopProduct from "../shopComponents/ShopProduct";

const ShopProductsScreen = ({ navigation }) => {
    const { token, updateToken } = useContext(AuthContext);

    let shopId = 1;
    const [products, setProducts] = useState([]);

    const fetchShopProducts = async () => {
        try {
            const response = await fetch(`https://shoploc-9d37a142d75a.herokuapp.com/api/product/shop/${shopId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Erreur lors de la récupération des produits');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des produits : ', error);
        }
    };

    useEffect(() => {
        fetchShopProducts();
    }, [shopId, token]);

    const refreshProducts = () => {
        fetchShopProducts();
    };


    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={colors.primary}
            />
            <View style={styles.head} >
              <Image source={logo} style={styles.logo} />
              <Text style={styles.title}>Mes produits</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <View>

                    {products.map(product => (
                        <ShopProduct
                            key={product.id}
                            navigation={navigation}
                            product={product}
                            refreshProducts={refreshProducts}
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
