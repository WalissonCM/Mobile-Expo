import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

export default function FormFornecedores({ navigation, route }) {

    const { acao, fornecedor: fornecedorAntiga } = route.params

    const validationSchema = Yup.object().shape({
        cpf: Yup.string().min(11, 'CPF deve conter 11 digitos').required('Campo obrigatório!'),
        nome: Yup.string().required(),
        idade: Yup.string().required(),
        peso: Yup.string().required(),
        altura: Yup.string().required(),
    })

    useEffect(() => {


        if (fornecedorAntiga) {
            setNome(fornecedorAntiga.nome)
            setIdade(fornecedorAntiga.idade)
            setPeso(fornecedorAntiga.peso)
            setAltura(fornecedorAntiga.altura)
        }

    }, [])


    function salvar(novaFornecedor) {

        if (fornecedorAntiga) {
            acao(fornecedorAntiga, novaFornecedor)
        } else {
            acao(novaFornecedor)
        }

        Toast.show({
            type: 'success',
            text1: 'Fornecedore salva com sucesso!'
        })

        navigation.goBack()
    }


    return (
        <View style={styles.container}>

            <Text variant='titleLarge' style={styles.title} >{fornecedorAntiga ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</Text>


            <Formik
                initialValues={{
                    cpf: '' || fornecedorAntiga?.cpf,
                    nome: '' || fornecedorAntiga?.nome,
                    idade: '' || fornecedorAntiga?.idade,
                    peso: '' || fornecedorAntiga?.peso,
                    altura: '' || fornecedorAntiga?.altura
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