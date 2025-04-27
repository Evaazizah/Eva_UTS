import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native";

type Message = {
    from: 'user' | 'dokter';
    text: string;
};

export default function KonsultasiScreen() {
    const [chat, setChat] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const handleSend = () => {
        if (!chat.trim())
            return;

        const userMessage: Message = {from: 'user', text: chat};
        const doctorReply: Message = {
            from: 'dokter',
            text: `👨‍⚕️ Terima kasih! Untuk pertanyaan: "${chat}", silakan cek info obat di halaman utama.`,
        };

        setMessages((prev) => [...prev, userMessage, doctorReply]);
        setChat('');
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>💬 Konsultasi Dokter</Text>

            <FlatList
                data={messages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
                    <Text
                        style={{
                            alignSelf: item.from === 'user' ? 'flex-end' : 'flex-start',
                            margin: 5,
                            backgroundColor: item.from === 'user' ? '#D6EAF8' : '#D1F2EB',
                            padding: 10,
                            borderRadius: 8,
                            maxWidth: '80%',
                        }}
                    >
                        {item.from == 'user' ? '🧑‍💻: ' : '👨‍⚕️: '}
                        {item.text}
                    </Text>
                )}
            />

            <TextInput
                value={chat}
                onChangeText={setChat}
                placeholder="Tanyakan sesuatu..."
                style={styles.input}
            />
            <Button title="Kirim" onPress={handleSend} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F0F8FF',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#fff',
    },
});