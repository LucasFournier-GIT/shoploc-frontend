import React, { useContext, useEffect, useState } from "react";
import { Image, StatusBar, View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { SearchBar } from 'react-native-elements';
import { ScrollView } from "react-native";
import logo from "./../../../assets/logo.png";
import colors from "../../../assets/colors";
import { AuthContext } from "./../../AuthContext";
import ShopNavbar from './../shopComponents/ShopNavbar';
const ShopOrdersScreen = ({ navigation }) => {

    const { token, updateToken } = useContext(AuthContext);
    

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={colors.primary}
            />
            <View style={styles.head} >
              <Image source={logo} style={styles.logo} />
              <Text>Orders</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                
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
    searchBarContainer: {
        backgroundColor: colors.background,
        borderWidth: 1.5,
        borderColor: colors.primary,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingHorizontal: 10,
        height: "150%",
        flexDirection: "row",
        flex: 1,
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
        backgroundColor: colors.background,
        position: 'sticky',
        top: 0,
        zIndex: 1, 
    }
});

export default ShopOrdersScreen;
