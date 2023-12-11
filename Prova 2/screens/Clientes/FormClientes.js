import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'
import { LogBox } from 'react-native';

export default function FormClientes({ navigation, route }) {

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
      ]);

    const { acao, cliente: clienteAntiga } = route.params
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')


    const validationSchema = Yup.object().shape({
        nome: Yup.string().min(10, 'Nome deve conter pelo menos 10 digitos').required('Campo obrigatório!'),
        cpf: Yup.string().min(11, 'CPF deve conter 11 digitos').required('Campo obrigatório!'),
        telefone: Yup.string().min(11, 'Telefone deve conter pelo menos 11 digitos').required('Campo obrigatório!'),  
    })

    useEffect(() => {
        if (clienteAntiga) {
            setNome(clienteAntiga.nome)
            setCpf(clienteAntiga.cpf)
            setTelefone(clienteAntiga.telefone)
        }
    }, [])


    function salvar(novaCliente) {

        if (clienteAntiga) {
            acao(clienteAntiga, novaCliente)
        } else {
            acao(novaCliente)
        }

        Toast.show({
            type: 'success',
            text1: 'Cliente salva com sucesso!'
        })

        navigation.goBack()
    }


    return (
        <View style={styles.container}>

            <Text variant='titleLarge' style={styles.title} >{clienteAntiga ? 'Editar Cliente' : 'Adicionar Cliente'}</Text>


            <Formik
                initialValues={{
                    nome: '' || clienteAntiga?.nome,
                    cpf: '' || clienteAntiga?.cpf,
                    telefone: '' || clienteAntiga?.telefone
                    
                }}
                validationSchema={validationSchema}
                onSubmit={values => salvar(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <>

                        <View style={styles.inputContainer}>

                           <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Nome'
                                value={values.nome}
                                onChangeText={handleChange('nome')}
                                onBlur={handleBlur('nome')}
                                error={touched.nome && errors.nome}
                             />
                            
                            {(touched.nome && errors.nome) && <Text style={{ color: 'red' }}>{errors.nome}</Text>}

                           
                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='CPF'
                                value={values.cpf}
                                placeholder='000.000.000-00'
                                onChangeText={handleChange('cpf')}
                                onBlur={handleBlur('cpf')}
                                error={touched.cpf && errors.cpf}
                                keyboardType='numeric'
                                render={props => <TextInputMask {...props} type={'cpf'} />}
                            />

                             {(touched.cpf && errors.cpf) && <Text style={{ color: 'red' }}>{errors.cpf}</Text>}

                             <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Telefone'
                                value={values.telefone}
                                placeholder='(00) 00000-0000'
                                onChangeText={handleChange('telefone')}
                                onBlur={handleBlur('telefone')}
                                error={touched.telefone && errors.telefone}
                                keyboardType='numeric'
                                render={props => <TextInputMask {...props} type={'cel-phone'} />}
                            />

                             {(touched.telefone && errors.telefone) && <Text style={{ color: 'red' }}>{errors.telefone}</Text>}

                        </View>
                        <View style={styles.buttonContainer}>

                            <Button
                                style={styles.button}
                                mode='outlined'
                                textColor='black'
                                onPress={() => navigation.goBack()}
                            >
                                Voltar
                            </Button>

                            <Button
                                style={styles.button}
                                buttonColor='#65b307'
                                textColor='white'
                                onPress={handleSubmit}
                            >
                                Salvar
                            </Button>

                        </View>

                    </>

                )}
            </Formik>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        margin: 10
    },
    inputContainer: {
        width: '90%',
        flex: 1
    },
    input: {
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        gap: 10,
        marginBottom: 10
    },
    button: {
        flex: 1
    }
})