import {Image, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import { useFocusEffect } from '@react-navigation/native';
import {AuthContext} from "../../AuthContext";
import ShopNavbar from './../shopComponents/ShopNavbar';
import ShopOrder from './../shopComponents/ShopOrder';
import colors from "../../../assets/colors";
import logo from "./../../../assets/logo.png";


const ShopOrdersScreen = ({ navigation }) => {
    const { token, updateToken } = useContext(AuthContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const autoLogin = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/authenticate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: "lucasfournierpro@gmail.com",
                        password: "18"
                    }),
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }

                const data = await response.json();
                updateToken(data.token);
            } catch (error) {
                console.error('Erreur lors de l\'auto-login : ', error);
            }
        };

        autoLogin();
    }, []); // Cette fonction s'exécute une seule fois après le montage du composant

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:8080/api/order/shop', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    if (!response.ok) {
                        throw new Error('Erreur lors de la requête');
                    }

                    const data = await response.json();
                    setOrders(data)
                } catch (error) {
                    console.error('Erreur lors de la récupération des commandes :', error);
                }
            };

            fetchData()
        }, [token])
    );


    function handleOrderPressed(order) {
        navigation.navigate('ShopOrderDetailsScreen', { order, navigation });
    }

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={colors.primary}
            />
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>Orders</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <ShopOrder key={order.id} order={order} onPress={handleOrderPressed} />
                    ))
                ) : (
                    <Text>Aucune commande disponible pour le moment.</Text>
                )}
            </ScrollView>
            <ShopNavbar navigation={navigation} screen="ShopOrdersScreen" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
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
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 3,
        borderBottomColor: colors.primary,
    },
});

export default ShopOrdersScreen;
