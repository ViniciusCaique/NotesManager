

import { View, Text, TouchableOpacity, TextInput, } from "react-native";
import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';



export function Note(){

    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')

    const { getItem, setItem } = useAsyncStorage('@notes')

    async function criarNota() {
        try {

            const id = uuid.v4();

            const newNote = {
                id,
                title,
                content,
            }

            const res = await getItem()
            const previousData = res ? JSON.parse(res) : []
            // const data = [...previousData, newNote]
            previousData.push(newNote)
            await setItem(JSON.stringify(previousData))

            setTitle('')
            setContent('')
        } catch (error) {
        //   throw new Error('Erro ao inserir dados: ', error)
            console.log(error)
        }
    }

    useEffect(() => {
        criarNota()
    }, [])

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%" }}
        >
            <View
                style={{ flex: 1, justifyContent: "center", padding: 20 }}
            >
                <Text>Nota</Text>
                <Text>Titulo</Text>
                <TextInput
                    style={{ width: 200, borderWidth: 1, borderStyle: "solid", borderColor: '#000000', borderRadius: 5 , borderRadius: 10, padding: 4 }}
                    placeholder='Titulo'
                    onChangeText={setTitle}
                    value={title}
                />
                <Text>Conteúdo</Text>
                <TextInput 
                    style={{ width: 200, borderWidth: 1, borderStyle: "solid", borderColor: '#000000', borderRadius: 10, marginBottom: 5 ,padding: 4, textAlignVertical: 'top' }}
                    placeholder='Conteudo'
                    multiline = {true}
                    numberOfLines = {4}
                    onChangeText={setContent}
                    value={content}
                />
                <TouchableOpacity
                    style={{ borderWidth: 2, borderRadius: 6, borderColor: 'black', padding: 4}}
                    onPress={criarNota}
                >
                <Text> Salvar </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}