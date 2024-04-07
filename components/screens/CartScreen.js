import React, { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Image} from 'react-native';
import ShopCartSummary from './../ShopCartSummary';
import CustomNavBar from '../CustomNavBar';
import colors from "./../../assets/colors";
import { AuthContext } from '../AuthContext';
import {backendUrl} from "../../assets/backendUrl";
import logo from "../../assets/logo.png";

const CartScreen = ({ navigation }) => {

  const [userCarts, setUserCarts] = useState([]);
  const { token, updateToken } = useContext(AuthContext);

    useEffect(() => {
    const fetchUserCarts = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/product_in_cart`, {

          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserCarts(data);
        } else {
          console.error('La requête a échoué');
        }
      } catch (error) {
        console.error('Erreur lors de la requête : ', error);
      }
    };

    fetchUserCarts();
  }, []);

      const handleValidateAll = () => {
        const totalAmount = userCarts.reduce((acc, store) => {
          return (
            acc +
            store.products.reduce((storeAcc, product) => {
              return storeAcc + product.quantity * product.price;
            }, 0)
          );
        }, 0);
        navigation.navigate("RecapCartScreen", { TotalAmount: totalAmount, navigation: navigation });
      };

  return (
    <View style={styles.container}>
        <View style={styles.head} >
            <Image source={logo} style={styles.logo} />
            <Text style={styles.heading}>Mes commandes</Text>
            <View/>
        </View>
        <ScrollView contentContainerStyle={styles.card}>
          {userCarts.map((cart) => (
            <ShopCartSummary navigation={navigation}
                             shopName={cart.shopName}
                             key={cart.id} store={cart.products} shopId={cart.shopId} />
          ))}
        <Pressable onPress={handleValidateAll} style={styles.allButton}>
            <Text style={{color: 'white'}}>Tout valider</Text>
        </Pressable>
      </ScrollView>
      <CustomNavBar navigation={navigation} screen="CartScreen" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
    logo:{
        width: 50,
        height: 50,
        margin:15,
    },
    heading: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 5,
      color: colors.primary,
      alignSelf: 'center',
    },
    ScrollView: {
        flex: 1,
        width: '90%',
        paddingBottom:10,
    },
    allButton: {
        backgroundColor: colors.secondary,
        padding: 20,
        borderRadius: 50,
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
    }
  });


export default CartScreen;
