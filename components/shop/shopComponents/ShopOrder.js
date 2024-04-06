import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../../assets/colors';

const ShopOrder = ({ order, onPress }) => {
    console.log(order);
    const { id, date, status, amount, paid, products } = order;


    let borderColor = paid ? colors.valid : colors.error;

    const handlePress = () => {
        onPress(order);
    };

    const containerStyle = [styles.container];
    const textStyle = [styles.text];

    if (status === 'terminée') {
        containerStyle.push(styles.disabled);
        textStyle.push(styles.disabledText);
        borderColor = "#9C9C9C";
    }

    return (
        <View style={[containerStyle, { borderBottomColor: borderColor }]}>
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.innerContainer}>
                    <Text style={textStyle}><b>Commande #{id}</b></Text>
                    <Text style={textStyle}>{products?.length} produit(s) | {status} | {paid ? 'Payée' : 'Non payée'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 32.5,
        elevation: 10,
        marginBottom: 25,
        borderBottomWidth: 10,
    },
    innerContainer: {
        padding: 10, // Ajouter un padding pour espacer le texte des bords du composant
    },
    text: {
        color: colors.primary,
        fontSize: 16,
    },
    disabled: {
        backgroundColor: "#E4E4E4",
    },
    disabledText: {
        color: "#9C9C9C",
    },
});

export default ShopOrder;
