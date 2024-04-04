import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CartItem from './CartItem';
import colors from "./../assets/colors";
import {AuthContext} from "./AuthContext";

const ShopCartSummary = ({ store, navigation, shopName }) => {
  const { token, updateToken } = useContext(AuthContext);
  let amount = 0;
  const handleValidate = () => {
    /*const totalAmount = store.products.reduce((acc, product) => {
      return 100;
      //return acc + product.price * product.quantity;
    }, 0);*/

    navigation.navigate("RecapCartScreen", { TotalAmount: amount, navigation: navigation });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading2}>{shopName}</Text>

      {store.map((product) => {
        amount = amount + product.price*product.quantity;
        return (<CartItem
                key={product.id}
                productId={product.id}
                name={product.productName}
                price={product.price}
                qty={product.quantity}
                imageUrl={product.imageUrl}
            />)
      })
      }
      <TouchableOpacity style={styles.button} onPress={handleValidate}>
        <Text style={styles.buttonText}>
          Valider
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  heading2: {
    color: colors.primary,
    fontSize: 20,
    marginBottom: 15
  },
  container: {
    // Styles pour le conteneur global du composant ShopCartSummary
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 5,
    borderRadius: 32.5,
    elevation: 5,
    alignSelf: "flex-end",
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    marginVertical: 5,
    marginHorizontal: 10
  }

});

export default ShopCartSummary;
