import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable} from "react-native";
import CityNavbar from "../cityComponents/CityNavbar";
import colors from '../../../assets/colors';
import React, {useContext, useState} from "react";
import {AuthContext} from "../../AuthContext";
import logo from "../../../assets/logo.png";
import {MaterialIcons} from "@expo/vector-icons";
import {backendUrl} from "../../../assets/backendUrl";
import {useFocusEffect} from "@react-navigation/native";

const HomeCityscreen = ({ navigation }) => {

    const [shops, setShops] = useState([]);
    const { token, updateToken } = useContext(AuthContext);
    const [selectedShop, setSelectedShop] = useState(null);

    const handleShopPress = (shop) => {
        if(selectedShop){
            shop.id === selectedShop.id ? setSelectedShop(null) : setSelectedShop(shop);
        }else{
            setSelectedShop(shop);
        }
    };


    const fetchShopData = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/shop`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }).then((res)=> {
                return res.json();
            }).then((data)=>{
                setShops(data);
            });
        } catch (error) {
            console.error('Erreur lors de la requête : ', error);
        }
    };


    useFocusEffect(
        React.useCallback(() => {
            fetchShopData();
        }, [token])
    );

    const handleDeleteShop = async (delShopId) => {
        console.log('delete shop', delShopId);
        try {
            const response = await fetch(`${backendUrl}/api/shop/${delShopId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to delete shop');
            }

            fetchShopData();
            setSelectedShop(null);
            console.log('Shop deleted successfully');
        } catch (error) {
            console.error('Error deleting shop:', error.message);
        }
    }
    const handleAddShop = async (shop) => {
        console.log('add shop', shop);
        try {
            const response = await fetch(`${backendUrl}/api/shop`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to create shop');
            }

            fetchShopData();
            setSelectedShop(null);
            console.log('Shop created successfully');
        } catch (error) {
            console.error('Error creating shop:', error.message);
        }
    }

    const handleGoAddShop = () => {
        navigation.navigate("CreateShopScreen");
    }

    return (
        <View style={styles.pageContainer}>
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>Magasins</Text>
                <View/>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                {shops.map((shop) => (
                    <TouchableOpacity key={shop.id} style={styles.shopInfo} onPress={() => handleShopPress(shop)}>
                        <View style={styles.mainContent}>
                            <View style={styles.shopNameContainer}>
                                <Text style={styles.shopName}>{shop.name}</Text>
                            </View>
                            <View style={styles.buttons}>
                                <Pressable style={styles.button} onPress={()=> {
                                    handleDeleteShop(shop.id);
                                }}>
                                    <MaterialIcons name="delete" size={28} color={colors.error}/>
                                </Pressable>
                            </View>
                        </View>
                        {selectedShop?.id===shop.id && (
                            <View style={styles.selectedShopDetails}>
                                <Text style={styles.detailText}>ID: <Text>{selectedShop.id}</Text></Text>
                                <Text style={styles.detailText}>Name: <Text style={styles.text}>{selectedShop.name}</Text></Text>
                                <Text style={styles.detailText}>Image URL: <Text style={styles.text}>{selectedShop.image_url}</Text></Text>
                                <Text style={styles.detailText}>Address: <Text style={styles.text}>{selectedShop.address}</Text></Text>
                                <Text style={styles.detailText}>Email: <Text style={styles.text}>{selectedShop.email}</Text></Text>
                                <Text style={styles.detailText}>GPS Coordinates: <Text style={styles.text}>{selectedShop.gps_coordinates}</Text></Text>
                                <Text style={styles.detailText}>Opening Hours: <Text style={styles.text}>{selectedShop.opening_hours}</Text></Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}

            </ScrollView>
            <Pressable style={styles.addButton} onPress={()=> {
                handleGoAddShop();
            }}>
                <MaterialIcons name="add" size={34} color='white'/>
            </Pressable>
            <CityNavbar navigation={navigation} screen={"HomeCityScreen"}/>
        </View>
    )
}
const styles = StyleSheet.create({
    pageContainer:{
      flex:1
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    shopInfo: {
        backgroundColor: "#FFF",
        borderRadius: 32.5,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    shopNameContainer: {
        flex: 1,
        marginRight: 10,
    },
    shopName: {
        fontWeight: "bold",
        color: colors.primary,
    },
    buttons: {
        flexDirection: "row",
    },
    selectedShopDetails: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },
    detailText: {
        marginBottom: 10,
        color: colors.primary,
        fontWeight: "bold",
    },
    text: {
        fontWeight: "normal",
    },
    logo:{
        width: 50,
        height: 50,
        margin:15,
        marginRight:0
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        position: 'sticky',
        top: 0,
        zIndex: 1,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.primary,
        alignSelf: 'center',
    },
    mainContent:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        borderRadius: 50,
        padding: 8,
        shadowColor: "black",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.50,
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
export default HomeCityscreen;
