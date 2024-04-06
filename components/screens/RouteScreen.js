import {Image, Linking, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import logo from "../../assets/logo.png";
import React, {useContext, useEffect} from "react";
import colors from "../../assets/colors";
import {Entypo} from "@expo/vector-icons";
import {AuthContext} from "../AuthContext";
import CustomNavBar from "../CustomNavBar";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {backendUrl} from "../../assets/backendUrl";

const RouteScreen = ( { navigation } ) => {
    const { token, updateToken } = useContext(AuthContext)
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    const [orders, setOrders] = React.useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/order/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes : ', error);
            }
        }

        fetchOrders();
    }, []);

    const getShopStatus = (openingHours) => {
        const [start, end] = openingHours.split('-');
        const current_time = new Date();
        const [openingHour, openingMinute] = start.trim().split(':').map(Number);
        const [closingHour, closingMinute] = end.trim().split(':').map(Number);
        const opening_hour = new Date();
        opening_hour.setHours(openingHour, openingMinute, 0);
        const closing_hour = new Date();
        closing_hour.setHours(closingHour, closingMinute, 0);

        return current_time >= opening_hour && current_time <= closing_hour
    }

    const handleGoTo = (orderId) => {
        if (orderId && orders.find(order => order.id === orderId)) {
            const order = orders.find(order => order.id === orderId);
            const gpsCoordinates = order.shops.map(shop => shop.gpsCoordinates);

            const destination = gpsCoordinates[0];
            const waypoints = gpsCoordinates.slice(1);

            const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&waypoints=${waypoints.join('|')}`;

            Linking.openURL(url);
        }
    };

    const handleViewRoute = (orderId) => {
        if (selectedOrder === orderId) {
            setSelectedOrder(0);
        } else {
            setSelectedOrder(orderId);
        }
    };

    return (
        <View style={styles.View}>
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>Mes commandes</Text>
                <View/>
            </View>
            <ScrollView style={styles.ScrollView}>
                {
                    orders.map((order) => (
                        <Pressable key={order.id} style={styles.pressableContainer} onPress={() => handleViewRoute(order.id)}>
                            <View style={styles.mainContent}>
                                <Text style={styles.pressableText}>Commande du {order.date.split('T')[0]}</Text>
                                <Pressable style={styles.button} onPress={() => handleGoTo(order.id)}>
                                    <Entypo name="compass" size={30} color="white" />
                                </Pressable>
                            </View>
                            {selectedOrder === order.id && (
                                <View style={styles.secondaryContent}>
                                    {
                                        order.shops.map((shop, index) => (
                                            <View key={index} style={styles.shopContainer}>
                                                <Text style={styles.shopContainerTitle}>{shop.shopName}</Text>
                                                <View style={styles.shopContainerHours}>
                                                    <FontAwesome name="circle" size={16} color={getShopStatus(shop.openingHours) ? "green" : "red"} />
                                                    <Text style={getShopStatus(shop.openingHours) ? styles.shopContainerOpen : styles.shopContainerClosed}>
                                                        {getShopStatus(shop.openingHours) ? "Ouvert" : "Fermé"} : {shop.openingHours}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                            )}
                        </Pressable>
                    ))
                }
            </ScrollView>
            <CustomNavBar navigation={navigation} screen="RouteScreen" />
        </View>
    );
};

const styles = StyleSheet.create({
    View: {
        flex: 1,
        backgroundColor: colors.background,
    },
    ScrollView: {
        flex: 1,
        paddingBottom:10,
    },
    mainContent: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    secondaryContent: {
        marginTop: 10,
        transition: 'height 1s',
    },
    pressableContainer: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 32.5,
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        width: '90%',
    },
    pressableText: {
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary,
    },
    button: {
        borderRadius: 50,
        padding: 7,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
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
    shopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    shopContainerHours: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shopContainerOpen: {
        color: "green",
        marginLeft: 10,
    },
    shopContainerClosed: {
        color: "red",
        marginLeft: 10,
    },
});

export default RouteScreen;
