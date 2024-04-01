import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../assets/colors';
import ShopNavbar from "../shopComponents/ShopNavbar";
import logo from "../../../assets/logo.png";
import { BarCodeScanner } from 'expo-barcode-scanner';



const ShopOrderDetailsScreen = ({ route, navigation }) => {
    const { orderId } = route.params;

    //TODO recuperer les données de la commande
    const order = {
        id: 1,
        date: '2024-03-25',
        status: 'en cours',
        montant: 50,
        estPayee: false,
        listProducts: [
            { name: 'Product 1', quantity: 2, price: 20 },
            { name: 'Product 2', quantity: 1, price: 30 }
        ],
        idUser: 1
    };

    // Texte du statut de la commande
    const statusText = order.status === 'terminée' ? 'Terminée' : 'En préparation';

    const [isScannerActive, setIsScannerActive] = useState(false);
    const [scannedData, setScannedData] = useState(null);

    // Fonction à exécuter lorsque le scanner détecte un QR code
    const handleBarCodeScanned = ({ type, data }) => {
        setIsScannerActive(false); // Désactive le scanner
        setScannedData(data); // Stocke les données du QR code scanné
    };

    // Fonction pour activer le scanner
    const activateScanner = () => {
        setIsScannerActive(true);
        setScannedData(null); // Réinitialise les données scannées précédemment
    };

    return (
        <View style={styles.container}>
            {/* En-tête */}
            <View style={styles.head}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>Mes produits</Text>
            </View>

            {/* Contenu de la page */}
            <View style={styles.content}>
                <Text style={styles.title}>Détails de la commande #{order.id}</Text>
                <Text>Nombre de produits: {order.listProducts.length}</Text>
                <Text>Montant: {order.montant}</Text>
                <Text>Statut: {statusText}</Text>
                <Text>{order.estPayee ? 'Payée' : 'Non payée'}</Text>
                <Text>Liste des produits:</Text>
                {/* Affichage de la liste des produits */}
                {order.listProducts.map((product, index) => (
                    <Text key={index}>{product.name}</Text>
                ))}
                {/* Bouton "Scanner" */}
            </View>

            <View style={styles.content}>
                {/* Affichage du scanner si activé */}
                {isScannerActive && (
                    <View style={styles.scannerContainer}>
                        <BarCodeScanner
                            onBarCodeScanned={handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        />
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setIsScannerActive(false)}>
                            <Text style={styles.cancelButtonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Affichage des données scannées */}
                {scannedData && (
                    <View style={styles.scannedDataContainer}>
                        <Text style={styles.scannedDataText}>Données scannées:</Text>
                        <Text>{scannedData}</Text>
                    </View>
                )}

                {/* Bouton "Scanner" */}
                {!isScannerActive && !scannedData && (
                    <TouchableOpacity style={styles.button} onPress={activateScanner}>
                        <Ionicons name="qr-code-outline" size={24} color="white" />
                        <Text style={styles.buttonText}>Scanner</Text>
                    </TouchableOpacity>
                )}
            </View>


            {/* Barre de navigation */}
            <ShopNavbar screen={"ShopOrdersScreen"} navigation={navigation}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 3,
        borderBottomColor: colors.primary,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        marginLeft: 5,
    },
    scannerContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    cancelButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    cancelButtonText: {
        color: 'white',
    },
    scannedDataContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    scannedDataText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
export default ShopOrderDetailsScreen;
