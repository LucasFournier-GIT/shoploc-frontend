import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../assets/colors';
import ShopNavbar from "../shopComponents/ShopNavbar";
import logo from "../../../assets/logo.png";
import { BarCodeScanner } from 'expo-barcode-scanner';
import {AuthContext} from "../../AuthContext";
import ProductCard from "../../ProductCard";



const ShopOrderDetailsScreen = ({ route, navigation }) => {
    const { order } = route.params;
    const { token } = useContext(AuthContext);

    const backUrl = 'http://localhost:8080'

    const [isScannerActive, setIsScannerActive] = useState(false);
    const [scannedData, setScannedData] = useState(null);
    const [status, setStatus] = useState(order.status);
    const [paid, setPaid] = useState(order.paid);

    // Fonction à exécuter lorsque le scanner détecte un QR code
    const handleBarCodeScanned = ({ type, data }) => {
        setIsScannerActive(false); // Désactive le scanner
        setScannedData(data); // Stocke les données du QR code scanné
    };

    const activateScanner = () => {
        setIsScannerActive(true);
        setScannedData(null);
    };

    const handlePay = async () => {
        try {
            const response = await fetch(`${backUrl}/api/order/${order.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ paid: true })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }

            await response.json();
            setPaid(true);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la commande :', error);
        }
    }

    const orderInProgress = async () => {
        try {
            const response = await fetch(`${backUrl}/api/order/${order.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'En préparation' })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }

            await response.json();
            setStatus('En préparation');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la commande :', error);
        }
    }

    const orderReady = async () => {
        try {
            const response = await fetch(`${backUrl}/api/order/${order.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'Prête' })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }

            await response.json();
            setStatus('Prête');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la commande :', error);
        }
    }

    const deleteOrder = async () => {
        try {
            const response = await fetch(`${backUrl}/api/order/${order.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }

            await response.json();
            navigation.navigate('ShopOrdersScreen');
        } catch (error) {
            console.error('Erreur lors de la suppression de la commande :', error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.head} >
                <Image source={logo} style={styles.logo} />
                <Text style={styles.heading}>Mes commandes</Text>
                <View/>
            </View>
            <ScrollView style={styles.content}>
                <View>
                    <View style={styles.detail}>
                        <Text style={styles.headOfContainer}>Détails de la commande #{order.id}</Text>
                        <Text style={styles.textLeftColumn}>Nombre de produits</Text>
                        <Text style={styles.text}>{order.products?.length}</Text>
                        <Text style={styles.textLeftColumn}>Montant</Text>
                        <Text style={styles.text}>{order.amount}</Text>
                        <Text style={styles.textLeftColumn}>Status</Text>
                        <Text style={styles.text}>{status}</Text>
                        <Text style={styles.textLeftColumn}>Paiement</Text>
                        <Text style={styles.text}>{paid ? 'Payée' : 'Non payée'}</Text>
                    </View>
                    <View style={[styles.detail, { marginVertical: 20 }]}>
                        <Text style={styles.headOfContainer}>Liste des produits:</Text>
                        <View style={{height: '40', alignItems: 'center'}}>
                            {order.products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    name={product.name}
                                    quantity={product.availability}
                                    description={product.description}
                                    imageUrl={product.imageUrl}
                                    navigation={navigation}
                                    id={product.id}
                                    price={product.price}
                                    disabledInteraction={true}
                                />
                            ))}
                        </View>
                    </View>
                    <View style={styles.buttonView}>
                        {status === 'En attente' ? (
                            <Pressable style={styles.button} onPress={orderInProgress}>
                                <Text style={styles.buttonText}>Préparer</Text>
                            </Pressable>
                        ) : status === 'En préparation' ? (
                            <Pressable style={styles.button} onPress={orderReady}>
                                <Text style={styles.buttonText}>Commande Prête</Text>
                            </Pressable>
                        ) : (
                            <>
                                {!order.paid && (
                                    <Pressable style={styles.button} onPress={handlePay}>
                                        <Text style={styles.buttonText}>Payer</Text>
                                    </Pressable>
                                )}
                                {!isScannerActive && !scannedData && (
                                    <Pressable style={styles.button} onPress={deleteOrder}>
                                        <Ionicons name="qr-code-outline" size={24} color="white" />
                                        <Text style={styles.buttonText}>Scanner</Text>
                                    </Pressable>
                                )}
                            </>
                        )}
                        {isScannerActive && (
                            <View style={styles.scannerContainer}>
                                <BarCodeScanner
                                    onBarCodeScanned={handleBarCodeScanned}
                                    style={StyleSheet.absoluteFillObject}
                                />
                                <Pressable style={styles.cancelButton} onPress={() => setIsScannerActive(false)}>
                                    <Text style={styles.cancelButtonText}>Annuler</Text>
                                </Pressable>
                            </View>
                        )}
                        {scannedData && (
                            <View style={styles.scannedDataContainer}>
                                <Text style={styles.scannedDataText}>Données scannées:</Text>
                                <Text>{scannedData}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            <ShopNavbar screen={"ShopOrdersScreen"} navigation={navigation}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    logo:{
        width: 50,
        height: 50,
        margin:15,
        marginRight:0
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: colors.background,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.primary,
        alignSelf: 'center',
    },
    content: {
        flex: 1,
    },
    textLeftColumn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 5,
        marginTop: 10,
    },
    headOfContainer: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 30,
    },
    detail: {
        backgroundColor: "white",
        borderRadius: 20,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.50,
        padding: 20,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    buttonView: {
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary,
        padding: 20,
        borderRadius: 50,
        marginVertical: 10,
        width: '90%',
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
    }
});
export default ShopOrderDetailsScreen;
