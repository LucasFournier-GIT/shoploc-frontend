import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from "./../../../assets/colors"

const ShopNavBar = ({ navigation, screen }) => {

    const handleGoShopProductsScreen = () => {
        navigation.navigate('ShopProductsScreen');
    }
    
    const handleGoShopOrdersScreen = () => {
        navigation.navigate('ShopOrdersScreen');
    }
    
    const handleGoShopProfileScreen = () => {
        navigation.navigate('ShopProfileScreen');
    }

    return (
        <View style={styles.navBar}>
            <TouchableOpacity
                onPress={handleGoShopProductsScreen}
                style={screen === 'ShopProductsScreen' ? styles.active : styles.inactive}
            >
                <Ionicons
                    name={screen === 'ShopProductsScreen' ? 'home' : 'home-outline'}
                    size={screen === 'ShopProductsScreen' ? 40 : 24}
                    color="white"
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleGoShopOrdersScreen}
                style={screen === 'ShopOrdersScreen' ? styles.active : styles.inactive}
            >
                <Ionicons
                    name={screen === 'ShopOrdersScreen' ? 'basket' : 'basket-outline'}
                    size={screen === 'ShopOrdersScreen' ? 40 : 24}
                    color="white"
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleGoShopProfileScreen}
                style={screen === 'ShopProfileScreen' ? styles.active : styles.inactive}
            >
                <Ionicons
                    name={screen === 'ShopProfileScreen' ? 'person' : 'person-outline'}
                    size={screen === 'ShopProfileScreen' ? 40 : 24}
                    color="white"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 70,
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    active: {
        backgroundColor: colors.primary,
        alignItems: "center",
        height: "80px",
        width: "80px",
        borderRadius:"100%",
        bottom: "10px",
        paddingTop: "10px"
    },
    inactive: {
        padding: 10,
    },
});

export default ShopNavBar;
