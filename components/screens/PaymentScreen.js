import React, {useContext, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Pressable} from 'react-native';
import CustomNavBar from '../CustomNavBar';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';
import colors from './../../assets/colors';
import CustomModal from './../CustomModal';
import {backendUrl} from "../../assets/backendUrl";
import {AuthContext} from "../AuthContext";

const PaymentScreen = ({ navigation, route }) => {
  const { TotalAmount, shopId } = route.params;
  const [paymentOption, setPaymentOption] = useState(TotalAmount);
  const [number, setNumber] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { token, setToken } = useContext(AuthContext);

  const handleOptionSelection = (option) => {
    setPaymentOption(option);
  };

  const handleNumberChange = (value) => {
    setNumber(value);
  };

  const handleValidate = async () => {
    await createOrder(true);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigation.navigate('HomeScreen');
  };

  const createOrder = async (paid) => {
    try {
      console.log({
        status: 'En attente',
        paid: paid,
        amount: TotalAmount,
        shopId: shopId,
        date: new Date().toISOString()
      })
      const response = await fetch(`${backendUrl}/api/order`, {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              status: 'En attente',
              paid: paid,
              amount: TotalAmount,
              shopId: shopId,
              date: new Date().toISOString()
            })
        }
        );
    } catch (e) {
      console.error('Error fetching user:', e);
    }

    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.option}>
          <Pressable style={styles.optionHead} onPress={() => handleOptionSelection('magasin')}>
            <Text style={styles.optionText}>Payer en magasin</Text>
          </Pressable>
        </View>
        <View style={styles.option}>
          <TouchableOpacity style={styles.optionHead} onPress={() => handleOptionSelection('ligne')}>
            <Text style={styles.optionText}>Payer en ligne</Text>
          </TouchableOpacity>
          {paymentOption === 'ligne' && (
            <View>
              <Text>Payez votre commande en ligne dès maintenant ({TotalAmount}€)</Text>
              <CustomInput type={'text'} label={'Numéro de carte'} placeholder={'Votre numéro de carte'} onChange={handleNumberChange} />
              <CustomInput type={'text'} label={'Date de péremption'} placeholder={'Date de fin de validité de la carte '} onChange={handleNumberChange} />
              <CustomInput type={'text'} label={'CVC'} placeholder={'Cryptogramme'} onChange={handleNumberChange} />
              <CustomButton text={'Valider'} onPress={handleValidate} />
            </View>
          )}
        </View>
      </View>
      <CustomModal isVisible={isModalVisible} onClose={handleCloseModal} modalText={'Le paiement a bien été effectué'} />
      <View style={styles.bottomNavBar}>
        <CustomNavBar navigation={navigation} screen="CartScreen" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  option: {
    backgroundColor: colors.background,
    margin: 5,
    padding: 10,
  },
  optionText: {
    fontSize: 17,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 32.5,
    padding: 20,
    elevation: 5,
    margin: 10,
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  validateButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 32.5,
    width: '10%',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default PaymentScreen;
