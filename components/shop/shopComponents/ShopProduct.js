import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import colors from './../assets/colors';

const ShopProduct = ({ navigation, product}) => {
    //id={product.id}
    //imageUrl={product.imageUrl}
    //name={product.name}
    //quantity={product.quantity}
    //price={product.price}
    //description={product.description}

    const [id, setId] = useState(product.id);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [name, setName] = useState(product.name);
    const [availability, setAvailability] = useState(product.availability);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);

    console.log(product, " : ", id, imageUrl, name, availability, price, description);

    const truncatedDescription = description.length > 30 ? `${description.substring(0, 27)}...` : description;

    function handleUpdate() {
        navigation.navigate('ShopUpdateProduct', { product });
    }

    return (
        <View style={styles.container}>
            <View style={styles.productContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <View style={styles.productInfo}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{name} -</Text>
                        <Text style={styles.details}>{availability} -</Text>
                        <Text style={styles.details}>{price}€</Text>
                    </View>
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
