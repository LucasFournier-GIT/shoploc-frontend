import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CartItem from './CartItem';
import colors from "./../assets/colors";

const ShopCartSummary = ({ store, navigation, shopName, shopId }) => {

  let amount = 0;
  const handleValidate = () => {
    navigation.navigate("RecapCartScreen", { TotalAmount: amount, navigation: navigation, shopId: shopId });
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
    margin: 10,
  },
  container: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 32.5,
    elevation: 5
  },
  button: {
    backgroundColor: colors.secondary,
    width: '100%',
    marginVertical: 10,
    padding: 5,
    borderRadius: 32.5,
    elevation: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    marginVertical: 5,
    marginHorizontal: 10
  }

});

export default ShopCartSummary;
