import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import colors from './../assets/colors';

const ShopProduct = ({ navigation, product, refreshProducts }) => {
    const truncatedDescription = product.description.length > 30 ? `${product.description.substring(0, 27)}...` : product.description;

    function handleUpdate(product) {
        navigation.navigate('ShopUpdateProduct', { product, refreshProducts });
    }


    return (
        <View style={styles.container}>
            <View style={styles.productContainer}>
                <Image source={{ uri: product.imageUrl }} style={styles.image} />
                <View style={styles.productInfo}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{product.name} -</Text>
                        <Text style={styles.details}>{product.availability} -</Text>
                        <Text style={styles.details}>{product.price}€</Text>
                    </View>
                    <Text style={styles.description}>{truncatedDescription}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => handleUpdate(product)}>
                <Ionicons name="pencil" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 32.5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        right:"10px",
        width:"100%",
        padding:'10px',
    },
    productContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        width:"100%"
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    productInfo: {
        flex: 1,
        marginLeft: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        color: '#5D3528',
        fontWeight: 'bold',
    },
    details: {
        fontSize: 16,
        color: '#5D3528',
        marginLeft: 5,
    },
    description: {
        fontSize: 14,
        color: '#5D3528',
    },
    editButton: {
        backgroundColor: '#275C50',
        padding: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
});
export default ShopProduct;
