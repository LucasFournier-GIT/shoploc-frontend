import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from "./../assets/colors";
import {AuthContext} from "./AuthContext";
import {backendUrl} from "../assets/backendUrl";

const CartItem = ({ name,  price, qty, imageUrl, productId}) => {

  const { token, updateToken } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(qty)

  // Fonction pour augmenter la quantité d'un produit dans le panier
  const handleIncrease = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/product_in_cart/add/${productId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Produit ajouté au panier avec succès !');
        setQuantity(prevQuantity => prevQuantity + 1);
      } else {
        console.error('Erreur lors de la requête : ', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la requête : ', error);
    }
  };

// Fonction pour diminuer la quantité d'un produit dans le panier
  const handleDecrease = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/product_in_cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Produit supprimé du panier avec succès !');
        setQuantity(prevQuantity => prevQuantity - 1);
      } else {
        console.error('Erreur lors de la requête : ', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la requête : ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.productName}>{name}</Text>
      <Text>{price * quantity}€</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.button} onPress={handleIncrease}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={handleDecrease}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 32.5,
    padding: 10,
    backgroundColor: colors.background,
    marginVertical: 5,
  },
  productName: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 32.5,
    elevation: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "white"
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 5,
    borderRadius: 32.5,
    elevation: 10,
    width: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: "white"
  },
  image:{
    marginHorizontal:10,
    width:"50px",
    height:"50px",
    borderRadius: 10,
  }
});

export default CartItem;
