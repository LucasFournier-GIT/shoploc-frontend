import {Image, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../AuthContext";
import ShopNavbar from './../shopComponents/ShopNavbar';
import ShopOrder from './../shopComponents/ShopOrder';
import colors from "../../../assets/colors";
import logo from "./../../../assets/logo.png";


const ShopOrdersScreen = ({ navigation }) => {
    const { token } = useContext(AuthContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
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

        fetchData().then(() => console.log(orders))
    }, []); // Cette fonction s'exécute une seule fois après le montage du composant

    /*const orders = [
        { id: 1, date: '2024-03-25', status: 'en cours', montant: 50, estPayee: false, listProducts: [{ name: 'Product 1' }, { name: 'Product 2' }], idUser: 1 },
        { id: 2, date: '2024-03-24', status: 'terminée', montant: 100, estPayee: true, listProducts: [{ name: 'Product 3' }, { name: 'Product 4' }], idUser: 2 },
        { id: 3, date: '2024-03-23', status: 'en préparation', montant: 75, estPayee: true, listProducts: [{ name: 'Product 5' }, { name: 'Product 6' }], idUser: 3 }
    ];*/


    function handleOrderPressed(order) {
        console.log("SEND ORDER", order);
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
