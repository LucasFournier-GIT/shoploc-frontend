import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import CustomSearchBar from './../CustomSearchBar';
import CustomNavBar from './../CustomNavBar';
import ProductCard from './../ProductCard';
import logo from './../../assets/logo.png';
import { Octicons } from '@expo/vector-icons';
import colors from "./../../assets/colors";
import { AuthContext } from '../AuthContext';


const ShopScreen = ({ route, navigation }) => {
  const { shopId } = route.params;
  const { token } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  //const backendUrl = Config.BACKEND_URL;
  const backendUrl = "https://shoploc-9d37a142d75a.herokuapp.com";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/product/shop/${shopId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

    const fetchCartProducts = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/product_in_cart/shop/${shopId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setCartProducts(data[0].products);
          }
        } else {
          console.error('Error fetching cart products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

    fetchCartProducts();
  }, [token]);

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={styles.headerMiddle}>
            <Text style={styles.heading2}>Magasin n°{shopId}</Text>
          </View>
          <TouchableOpacity style={styles.headerRight}>
            <Octicons name="info" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBarContainer}>
          <CustomSearchBar />
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {cartProducts.length > 0 && products.map((product) => {
          const cartProduct = cartProducts.find((cartProduct) => cartProduct.id === product.id);
          const quantity = cartProduct ? cartProduct.quantity : 0;
          return (
              <ProductCard
                  key={product.id}
                  name={product.name}
                  availability={product.availability}
                  description={product.description}
                  imageUrl={product.imageUrl}
                  navigation={navigation}
                  id={product.id}
                  price={product.price}
                  qty={quantity}
              />
          );
        })}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            quantity={product.availability}
            description={product.description}
            imageUrl={product.imageUrl}
            navigation={navigation}
            id={product.id}
            price={product.price}
            disabledInteraction={false}
          />
        ))}
      </ScrollView>
        <CustomNavBar navigation={navigation} screen="HomeScreen" />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    height: "100%"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  headerLeft: {
    flex: 1,
  },
  headerMiddle: {
    flex: 3,
    alignItems:"center"
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight:10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  heading2: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingBottom: "25%",
    marginTop: 10,
  },
  searchBarContainer: {
    paddingHorizontal: 10,
    height:"9%"
  },
});

export default ShopScreen;
