import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ScrollViewBase } from 'react-native';
import ShopCartSummary from './../ShopCartSummary';
import CustomNavBar from '../CustomNavBar';
import colors from "./../../assets/colors";

const CartScreen = ({ navigation }) => {
    
  const [userCarts, setUserCarts] = useState([]);

  useEffect(() => {
    const fetchUserCarts = async () => {
      try {
        const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjYW1pbGxlcm1wb2lyaWVyQGdtYWlsLmNvbSIsImlhdCI6MTcwMjY1MjIzOCwiZXhwIjoxNzAyNjUzNjc4fQ.jquyVK7G0xVR4HQvBQNxtYKA6v_c_g5v5P9RuQIxokUE8zi6kiMCa0nU13QJyjLc'; 
        const response = await fetch('http://localhost:8080/product_in_cart/user_carts', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Données des paniers de l\'utilisateur :', data);
          setUserCarts(data);
        } else {
          console.error('La requête a échoué');
        }
      } catch (error) {
        console.error('Erreur lors de la requête : ', error);
      }
    };

    fetchUserCarts();
  }, []); // Assurez-vous de passer les dépendances appropriées si nécessaire


      const handleValidateAll = () => {
        const totalAmount = storeCarts.reduce((acc, store) => {
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

          {storeCarts.map((cart) => (
            <ShopCartSummary navigation={navigation} key={cart.id} store={cart} />
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
      bottom: 85, // Modifier cette valeur pour ajuster la position du conteneur du bouton
      width: '100%',
      alignItems: 'center', // Centrer horizontalement le bouton dans son conteneur
      
    },
  });
  

export default CartScreen;
