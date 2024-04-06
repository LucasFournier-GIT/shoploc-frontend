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
    const [shopId, setShopId] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Shop data:', data);
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

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchShopProducts = async () => {
            setShopId(1);
            try {
                // Assurez-vous d'ajuster l'URL en fonction de votre API
                const response = await fetch(`http://localhost:8080/api/product/shop/202`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Erreur lors de la récupération des produits');
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

        fetchShopProducts();
    }, [token]);


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
                            product={product}
                            navigation={navigation}
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
