

import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, Modal, StyleSheet, TextInput } from "react-native";
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { Feather } from '@expo/vector-icons'
import { useFocusEffect } from "@react-navigation/native";


export function Home({ navigation }) {

    const [ notes, setNotes ] = useState([])

    const { getItem, setItem, } = useAsyncStorage('@notes')

    const [ note, setNote ] = useState([])

    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')
    const [ isEdit, setIsEdit ] = useState(false)

    async function updateNote() {
        try {
            const res = await getItem()
            let notesAtuais = []
            if(res !== null) notesAtuais = JSON.parse(res)
            const updateNote = notesAtuais.filter(n => {
                if(n.id === note.id ) {
                    n.title = title,
                    n.content = content
                }
                return n;
            })

            setNote(updateNote)
            await setItem(JSON.stringify(updateNote))
        } catch (error) {
            console.log(error)
        }

        setModalVisible(!modalVisible)
    }

    const [modalVisible, setModalVisible] = useState(false);

    async function getNotes() {
        const res = await getItem()
        const notes = res ? JSON.parse(res) : []
        setNotes(notes)
    }

    async function removeNotes(id) {
        const res = await getItem()
        const previousData = res ? JSON.parse(res) : []

        const data = previousData.filter((item) => item.id !== id)
        setItem(JSON.stringify(data))
        setNotes(data)
    }
 
    useFocusEffect(useCallback(() => {
        getNotes(),
        updateNote()
    }, []))

    // useEffect(() => {
    //     getNotes()
    // }, [notes])

    

    return(
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "space-between", width: "100%", padding: 20 }}
        >
            <Text
                style={{ fontSize: 25, fontWeight: "bold" }}
            >Notas</Text>
            <FlatList
                style={{ flex: 1, width: '100%', padding: 16,  }}
                data={notes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View
                        style={{ flex: 1, borderStyle:"solid", borderWidth: 2, borderRadius: 8, padding: 10, margin: 5, }}
                    >
                        <TouchableOpacity>
                            <Text
                                style={{ fontWeight: "600", fontSize: 20 }}
                            >{item.title}</Text>
                            <Text>{item.content}</Text>

                            <View
                                style={{ flex: 1, }}
                            >
                                <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                                }}>
                                    <View
                                        style={styles.container}
                                    >
                                        <View style={styles.modalView}>
                                        <TouchableOpacity
                                            style={[ styles.button, styles.buttonClose ]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}>Close</Text>
                                        </TouchableOpacity>
                                        <Text>Editar Nota</Text>
                                        <Text>Titulo</Text>
                                        <TextInput
                                            style={{ width: 200, borderWidth: 1, borderStyle: "solid", borderColor: '#000000', borderRadius: 5 , borderRadius: 10, padding: 4 }}
                                            placeholder='Titulo'
                                            onChangeText={setTitle}
                                        />
                                        <Text>Conteúdo</Text>
                                        <TextInput 
                                            style={{ width: 200, borderWidth: 1, borderStyle: "solid", borderColor: '#000000', borderRadius: 10, marginBottom: 5 ,padding: 4 }}
                                            placeholder='Conteudo'
                                            onChangeText={setContent}
                                        />
                                        <TouchableOpacity
                                            style={{ borderWidth: 2, borderRadius: 6, borderColor: 'black', padding: 4}}
                                            onPress={() => updateNote()}
                                        >
                                            <Text> Salvar </Text>
                                        </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Feather 
                                        name='edit'
                                        size={25}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Feather 
                                        name='trash-2'
                                        size={25}
                                        onPress={() => removeNotes(item.id)}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Clock")}
                                >
                                    <Text>Start</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalView: {
      flex: 1,
      width: 300,
      height: 400,
      marginTop: 60,
      marginBottom: 400,
      backgroundColor: '#ababab',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 16,
      padding: 12,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#007bff',
    },
    buttonClose: {
      backgroundColor: '#ff1a00',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonVerify: {
      backgroundColor: '#007bff',
      width: 240,
      borderRadius: 8,
      padding: 12,
    }
});