import React, { useState } from 'react';
import { Alert } from 'react-native';
import { VStack } from 'native-base';

import firestore from '@react-native-firebase/firestore';

import {Header} from '../components/Header'
import {Button} from '../components/Button'
import { Input } from '../components/Input';
import { useNavigation } from '@react-navigation/native';

export function Register() {
  const [isloading, setisloading] = useState(false)
  const [patrimony, setPatrimony] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  function handleNewOrderRegister(){
    if (!patrimony || !description) {
      return Alert.alert("Registar", "Preencha todos os campos")
    }

    setisloading(true)

    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(()=>{
      Alert.alert("Solicitação", "Registrada com sucesso!")
      navigation.goBack()
    })
    .catch((error)=>{
      console.log(error)
      setisloading(false)
      return Alert.alert('Solicitação', "Não foi possível registrar o pedido")
    })
  }

  return (
    <VStack flex={1} p={6} bg={"gray.600"}>
      <Header title="=Solicitação" />

      <Input placeholder="Número do patrimonio" onChangeText={setPatrimony} mt={4} />

      <Input placeholder='Descrição do problema'
        flex={1}
        mt={5}
        
        multiline
        textAlignVertical='top'
        onChangeText={setDescription}
      />

      <Button title={"Cadastrar"} mt={5} isLoading={isloading} onPress={handleNewOrderRegister}>Cadastrar</Button>
    </VStack>
  );
}
