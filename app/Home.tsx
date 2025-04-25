import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import {router} from 'expo-router';

export default function HomeScreen() {
    const [drugs, setDrugs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((json) => {
            setDrugs(json);
            setLoading(false);
        })
        .catch((err) => {
            setError('Terjadi Kesalahan saat mengambil data');
            setLoading(false);
            console.error('Error fetching drugs', err);
        });
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff"/>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selamat Datang di Apotek Digital 🩺</Text>
            <Text style={styles.subtitle}>Temukan dan Pesan Obat dengan Mudah</Text>
            
            <FlatList
            data={drugs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <View style={styles.card}>
                    <Text style={styles.name}>{item.title || 'Nama Obat Tidak Tersedia'}</Text>
                    <Text>Harga: Rp {item.price}</Text>
                    <Button
                        title="Pesan"
                    
                    />
                </View>
            )}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F0F8FF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 15,
        color: '#666',
    },
    card: {
        marginBottom: 10,
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#F0F8FF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    name: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    konsultasi: {
        color: '#007bff',
        marginTop: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});