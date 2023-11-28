import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

export default function FormClientes({ navigation, route }) {

    const { acao, cliente: clienteAntiga } = route.params

    const validationSchema = Yup.object().shape({
        cpf: Yup.string().min(11, 'CPF deve conter 11 digitos').required('Campo obrigatório!'),
        nome: Yup.string().required(),
        idade: Yup.string().required(),
        peso: Yup.string().required(),
        altura: Yup.string().required(),
    })

    useEffect(() => {


        if (clienteAntiga) {
            setNome(clienteAntiga.nome)
            setIdade(clienteAntiga.idade)
            setPeso(clienteAntiga.peso)
            setAltura(clienteAntiga.altura)
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
                    cpf: '' || clienteAntiga?.cpf,
                    nome: '' || clienteAntiga?.nome,
                    idade: '' || clienteAntiga?.idade,
                    peso: '' || clienteAntiga?.peso,
                    altura: '' || clienteAntiga?.altura
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
                                label='CPF'
                                value={values.cpf}
                                onChangeText={handleChange('cpf')}
                                onBlur={handleBlur('cpf')}
                                error={errors.cpf ? true : false}
                                keyboardType='numeric'
                            />

                            {touched.cpf && errors.cpf && (
                                <Text style={{ color: 'red', textAlign: 'center' }}>{errors.cpf}</Text>
                            )}

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Nome'
                                value={values.nome}
                                onChangeText={handleChange('nome')}
                                onBlur={handleBlur('nome')}
                            />

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Idade'
                                value={values.idade}
                                onChangeText={handleChange('idade')}
                                onBlur={handleBlur('idade')}
                            />

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Peso'
                                value={values.peso}
                                onChangeText={handleChange('peso')}
                                onBlur={handleBlur('peso')}
                            />

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Altura'
                                value={values.altura}
                                onChangeText={handleChange('altura')}
                                onBlur={handleBlur('altura')}
                            />


                        </View>
                        <View style={styles.buttonContainer}>

                            <Button
                                style={styles.button}
                                mode='contained-tonal'
                                onPress={() => navigation.goBack()}
                            >
                                Voltar
                            </Button>

                            <Button
                                style={styles.button}
                                mode='contained'
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