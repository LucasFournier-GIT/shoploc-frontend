import { StyleSheet, View, SafeAreaView, Button, Alert, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#5D3528"
      />
      <Button color="#5D3528" title="Entrer" onPress={() => Alert.alert("Titre", "Message", [{text: "Oui", onPress: () => console.log("Oui")}, {text: "Non", onPress: () => console.log("Non")}])}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    height: '50%',
    width: '50%',
    backgroundColor: 'lightblue'
  }
});
