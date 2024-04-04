import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import colors from "./../assets/colors";

const CustomNavBar = ({navigation, screen}) => {


    const handleGoHomeScreen = () => {
        navigation.navigate('HomeScreen');
    }

    const handleGoLoginScreen = () => {
        navigation.navigate('LoginScreen')
    }

    const handleGoCartScreen = () => {
        navigation.navigate('CartScreen')
    }

    const handleProfileScreen = () => {
        navigation.navigate('ProfileScreen')
    }

    return(
        <View style={styles.navBar}>
            <TouchableOpacity
                onPress={handleGoHomeScreen}
                style={screen === 'HomeScreen' ? styles.active : ""}
                >
                <Ionicons
                style={styles.icon}
                name={screen === 'HomeScreen' ? "home" : "home-outline"}
                size={screen === 'HomeScreen' ? 30 : 25}
                color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                disabled={true}
                onPress={handleGoLoginScreen}
                style={screen === 'LoginScreen' ? styles.active : ""}
                >
                {screen === 'MapScreen' ? (
                    <MaterialIcons name="location-pin" size={30} color="white" />
                ) : (
                    <Feather name="map-pin" size={25} color="white" />
                )}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleGoCartScreen}
                style={screen === 'CartScreen' ? styles.active : ""}
                >
                <Ionicons
                    name={screen === "CartScreen" ? "basket" : "basket-outline"}
                    size={screen === "CartScreen" ? 30 : 25}
                    color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleProfileScreen}
                style={screen === 'ProfileScreen' ? styles.active : ""}
                >
                <Ionicons
                    name={screen === "LoginScreen" ? "person" : "person-outline"}
                    size={screen === "LoginScreen" ? 30 : 25}
                    color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default CustomNavBar;

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 55,
        width: 300,
        alignItems: 'center',
        backgroundColor: colors.primary,
        alignSelf: 'center',
        borderRadius: 32.5,
        position: 'sticky',
        bottom: 10,
        zIndex: 1,
    },
    navText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    active:{
        backgroundColor: colors.primary,
        borderRadius: 50,
        marginBottom: 15,
        padding: 12,
        alignItems:"center",
    },
    hidden:{
        display:"none",
    }
  });


