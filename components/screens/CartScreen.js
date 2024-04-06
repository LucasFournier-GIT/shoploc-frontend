import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import ShopCartSummary from './../ShopCartSummary';
import CustomNavBar from '../CustomNavBar';
import colors from "./../../assets/colors";
import { AuthContext } from '../AuthContext';
import Config from "react-native-config";

const CartScreen = ({ navigation }) => {

  const [userCarts, setUserCarts] = useState([]);
  const { token, updateToken } = useContext(AuthContext);

  //const backendUrl = Config.BACKEND_URL;
    const backendUrl = "https://shoploc-9d37a142d75a.herokuapp.com";


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
        <Text style={styles.heading}>Paniers</Text>
        <ScrollView style={styles.card}>

          {userCarts.map((cart) => (
            <ShopCartSummary navigation={navigation}
                             shopName={cart.shopName}
                             key={cart.id} store={cart.products} />
          ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Valider tout" onPress={handleValidateAll} color={"#275C50"} />
      </View>

      <CustomNavBar navigation={navigation} screen="CartScreen" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      top: 0,
      backgroundColor: colors.background,
    },
    content: {
      bottom: 125,
    },
    heading: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 5,
      color: colors.primary,
      alignSelf: 'center',
    },
    card: {
      backgroundColor: "white",
      borderRadius: 32.5,
      margin: 10,
      marginBottom:135,
      padding:5,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 95,

      width: '100%',
      alignItems: 'center',

    },
  });


export default CartScreen;
