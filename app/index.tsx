import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";


export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/APOTEK.jpeg')} style={styles.logo} resizeMode="contain"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
  },
});