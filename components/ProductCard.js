import React, {useContext, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors  from './../assets/colors';
import {AuthContext} from "./AuthContext";
import {backendUrl} from "../assets/backendUrl";

const ProductCard = ({ name, id, availability, description, imageUrl, price, qty, disabledInteraction }) => {
  const { token, updateToken } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(qty)

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/product_in_cart/add/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('Produit ajouté au panier avec succès !');
        setQuantity(prevQuantity => prevQuantity + 1);
        console.log('quantity : ', quantity)
      } else {
        console.error('Erreur lors de la requête : ', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la requête : ', error);
    }
  };

  const handleRemoveFromCart = async () => {
    if (quantity > 0) {
      try {
        const response = await fetch(`${backendUrl}/api/product_in_cart/remove/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          console.log('Produit supprimé du panier avec succès !');
          setQuantity(prevQuantity => prevQuantity - 1);
          console.log('quantity : ', quantity)
        } else {
          console.error('Erreur lors de la requête : ', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la requête : ', error);
      }
    }
  };

  return (
    <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{price}</Text>
        <Text style={[styles.availability, { color: availability === 0 ? colors.error : colors.valid }]}>
          {availability === 0 ? 'Rupture de stock' : `En stock: ${availability}`}
        </Text>
        <Text style={styles.description}>{description}</Text>

      {availability > 0 && !disabledInteraction && (
        <View style={styles.addToCart}>
          <TouchableOpacity onPress={handleAddToCart} style={[styles.button, styles.roundButton]}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <Text style={[styles.cartQuantity, quantity === 0 && { display: 'none' }]}>{quantity}</Text>
          <TouchableOpacity
              onPress={handleRemoveFromCart}
              style={[styles.button, quantity === 0 && { display: 'none' }, styles.roundButton]}>
          <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    borderRadius: 32.5,
    backgroundColor: 'white',
    elevation: 5,
    margin: 5,
    width: '47%',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 32.5,
    marginTop: 0,
    marginBottom: 5,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  availability: {
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  description: {
    fontSize: 15,
    fontStyle: 'italic',
    color: colors.primary,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
  },
  addToCart: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    flexDirection: 'col',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width:55
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    marginHorizontal: 5,
    width:"100%",
    alignItems:"center"
  },
  roundButton: {
    borderRadius: 50,
    backgroundColor: colors.secondary,
    elevation:10
  },
  buttonText: {
    color: 'white',
  },
  cartQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color:"white"
  },
});

export default ProductCard;
