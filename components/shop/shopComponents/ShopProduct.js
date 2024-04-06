import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ShopProduct = ({ navigation, product}) => {


    const [id, setId] = useState(product.id);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [name, setName] = useState(product.name);
    const [availability, setAvailability] = useState(product.availability);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);

    useEffect(() => {
        setId(product.id);
        setImageUrl(product.imageUrl);
        setName(product.name);
        setAvailability(product.availability);
        setPrice(product.price);
        setDescription(product.description);
    }, [product]);

    const truncatedDescription = description.length > 30 ? `${description.substring(0, 27)}...` : description;

    function handleUpdate() {
        navigation.navigate('ShopUpdateProduct', { product });
    }

    return (
        <View style={styles.container}>
            <View style={styles.productContainer}>
                <Image source={{ uri: product.imageUrl }} style={styles.image} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.details}>{availability}</Text>
                    <Text style={styles.details}>{price}€</Text>
                    <Text style={styles.description}>{truncatedDescription}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => handleUpdate()}>
                <Ionicons name="pencil" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 32.5,
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        width: '90%',
    },
    productContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
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
        marginVertical: 10,
    },
});
export default ShopProduct;
