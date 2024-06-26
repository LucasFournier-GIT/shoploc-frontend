import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from "./../../../assets/colors"

const CityNavbar = ({ navigation, screen }) => {

    const handleGoHomeCityScreen = () => {
        navigation.navigate('HomeCityScreen');
    }

    const handleGoProfileCityScreen = () => {
        navigation.navigate('ProfileCityScreen');
    }

    return (
        <View style={styles.navBar}>
            <TouchableOpacity
                onPress={handleGoHomeCityScreen}
                style={screen === 'HomeCityScreen' ? styles.active : styles.inactive}
            >
                <Ionicons
                    name={screen === 'HomeCityScreen' ? 'home' : 'home-outline'}
                    size={screen === 'HomeCityScreen' ? 40 : 24}
                    color="white"
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleGoProfileCityScreen}
                style={screen === 'ProfileCityScreen' ? styles.active : styles.inactive}
            >
                <Ionicons
                    name={screen === 'ProfileCityScreen' ? 'person' : 'person-outline'}
                    size={screen === 'ProfileCityScreen' ? 40 : 24}
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
        height: 60,
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position:"sticky",
        width:"90%",
        bottom: 0,
        alignSelf:"center",
    },
    active: {
        backgroundColor: colors.primary,
        alignItems: "center",
        height: "80px",
        width: "80px",
        borderRadius:"100%",
        bottom: 10,
        paddingTop: 10
    },
    inactive: {
        padding: 10,
        justifyContent: "center",
    },
});

export default CityNavbar;
