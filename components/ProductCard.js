import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors  from './../assets/colors';

const ProductCard = ({ navigation, name, id, quantity, description, imageUrl, price }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  const handleAddToCart = () => {
    setCartQuantity(cartQuantity + 1);
  };

  const handleRemoveFromCart = () => {
    if (cartQuantity > 0) {
      setCartQuantity(cartQuantity - 1);
    }
  };

  return (
    <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{price}</Text>
        <Text style={[styles.quantity, { color: quantity === 0 ? colors.error : colors.valid }]}>
          {quantity === 0 ? 'Rupture de stock' : `En stock: ${quantity}`}
        </Text>
        <Text style={styles.description}>{description}</Text>

      {quantity > 0 && (
        <View style={styles.addToCart}>
          <TouchableOpacity onPress={handleAddToCart} style={[styles.button, styles.roundButton]}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          
          <Text style={[styles.cartQuantity, cartQuantity === 0 && { display: 'none' }]}>{cartQuantity}</Text>
          
          <TouchableOpacity
            onPress={handleRemoveFromCart}
            style={[styles.button, cartQuantity === 0 && { display: 'none' }, styles.roundButton]}
          >
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
  quantity: {
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
    position: 'absolute', // Utilisation d'une position absolue
    top: 5, // Ajustez ces valeurs pour positionner "addToCart"
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
