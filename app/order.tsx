import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, ScrollView } from "react-native";

export default function orderScreen() {
    const [selectedObat, setSelectedObat] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [obatList, setObatList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [eror, setEror] = useState<string | null>(null);
    const [pesananList, setPesananList] = useState<string[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((json) => {
                setObatList(json);
                setLoading(false);
                console.log('Obat List:', json);
            })
            .catch((err) => {
                setEror('Terjadi Kesalahan saat mengambil Data');
                setLoading(false);
                console.error('Eror Fetching Drugs:', err);
            });
    },      []);

    const handlePesan = () => {
        if (!selectedObat || !jumlah) {
            alert('Mohon Lengkapi Data.');
            return;
        }

        const pesanText = `✅ ${selectedObat} sebanyak ${jumlah} berhasil dipesan.`;
        setPesananList((prev) => [...prev, pesanText]);
        console.log('Pesanan:', pesanText);
        setSelectedObat('');
        setJumlah('');
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff"/>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (eror) {
        return (
            <View style={styles.center}>
                <Text>{eror}</Text>
            </View>
        );
    }
     
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>🛒Form Pemesanan Obat</Text>
            <Text style={styles.label}>pilih Nama Obat</Text>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setModalVisible(true)}
            >
                <Text>{selectedObat || '-- Pilih Obat --'}</Text>
            </TouchableOpacity>
     
            <Text style={styles.label}>Jumlah:</Text>
            <TextInput
                style={styles.input}
                placeholder="Contoh:2"
                keyboardType="numeric" 
                value={jumlah}
                onChangeText={setJumlah}
            />
            <Button title="🧾 PESAN SEKARANG" onPress={handlePesan} color="#007bff"/>
            {pesananList.length > 0 && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultTitle}>📦Daftar Pesanan:</Text>
                    {pesananList.map((pesan, index) => (
                        <Text key={index} style={styles.resultItem}>
                            {pesan}
                        </Text>
                    ))}
                </View>      
            )}   
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Pilih Obat</Text>
                        <ScrollView>
                            {obatList.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => {
                                        setSelectedObat(item.title || 'Obat Tidak Tersedia');
                                        setModalVisible(false);
                                        console.log('Obat yang dipilih:', item.title);
                                    }}
                                    style={styles.modalItem}
                                >
                                    <Text>{item.title || 'Nama Obat Tidak Tersedia'}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <Button title="Tutup" onPress={() => setModalVisible(false)}/>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F0F8FF',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        borderBottomColor: '#fff',
        borderRadius: 8,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    resultBox: {
        marginTop: 25,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    resultTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16,
    },
    resultItem: {
        fontSize: 14,
        marginBottom: 5,
    },
});