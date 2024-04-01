import React, { useContext } from "react";
import { Image, StatusBar, View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native";
import { AuthContext } from "../../AuthContext";
import ShopNavbar from './../shopComponents/ShopNavbar';
import ShopOrder from './../shopComponents/ShopOrder';
import colors from "../../../assets/colors";
import logo from "./../../../assets/logo.png";

const ShopOrdersScreen = ({ navigation }) => {
    const { token } = useContext(AuthContext);

    const orders = [
        { id: 1, date: '2024-03-25', status: 'en cours', montant: 50, estPayee: false, listProducts: [{ name: 'Product 1' }, { name: 'Product 2' }], idUser: 1 },
        { id: 2, date: '2024-03-24', status: 'terminée', montant: 100, estPayee: true, listProducts: [{ name: 'Product 3' }, { name: 'Product 4' }], idUser: 2 },
        { id: 3, date: '2024-03-23', status: 'en préparation', montant: 75, estPayee: true, listProducts: [{ name: 'Product 5' }, { name: 'Product 6' }], idUser: 3 }
    ];

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
                {orders.map(order => (
                    <ShopOrder key={order.id} order={order} onPress={(orderId) => console.log("Order clicked:", orderId)} />
                ))}
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
