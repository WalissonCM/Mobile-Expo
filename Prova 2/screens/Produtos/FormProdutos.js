import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'
import { LogBox } from 'react-native';

export default function FormProdutos({ navigation, route }) {

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
      ]);

    const { acao, produto: produtoAntigo } = route.params
    const [nome, setNome] = useState('')
    const [data, setData] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tipo, setTipo] = useState('')


    const validationSchema = Yup.object().shape({
        nome: Yup.string().min(10, 'Nome deve conter pelo menos 10 digitos').required('Campo obrigatório!'),
        data: Yup.string().required('Campo obrigatório!'),
        descricao: Yup.string().min(10, 'Descricao deve conter pelo menos 10 digitos').required('Campo obrigatório!'),
        tipo: Yup.string().min(5, 'Tipo deve conter pelo menos 5 digitos').required('Campo obrigatório!'),  
    })

    useEffect(() => {
        if (produtoAntigo) {
            setNome(produtoAntigo.nome)
            setData(produtoAntigo.data)
            setDescricao(produtoAntigo.descricao)
            setTipo(produtoAntigo.tipo)
        }
    }, [])


    function salvar(novaProduto) {

        if (produtoAntigo) {
            acao(produtoAntigo, novaProduto)
        } else {
            acao(novaProduto)
        }

        Toast.show({
            type: 'success',
            text1: 'Produto salvo com sucesso!'
        })

        navigation.goBack()
    }


    return (
        <View style={styles.container}>

            <Text variant='titleLarge' style={styles.title} >{produtoAntigo ? 'Editar Produto' : 'Adicionar Produto'}</Text>


            <Formik
                initialValues={{
                    nome: '' || produtoAntigo?.nome,
                    data: '' || produtoAntigo?.data,
                    descricao: '' || produtoAntigo?.descricao,
                    tipo: '' || produtoAntigo?.tipo,
                    
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
                                label='Data'
                                value={values.data}
                                placeholder='00/00/0000'
                                onChangeText={handleChange('data')}
                                onBlur={handleBlur('data')}
                                error={touched.data && errors.data}
                                keyboardType='numeric'
                                render={props => <TextInputMask {...props} type={'datetime'} />}
                            />

                             {(touched.data && errors.data) && <Text style={{ color: 'red' }}>{errors.data}</Text>}

                             <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Descricao'
                                value={values.descricao}
                                onChangeText={handleChange('descricao')}
                                onBlur={handleBlur('descricao')}
                                error={touched.descricao && errors.descricao}
                             />
                            
                            {(touched.descricao && errors.descricao) && <Text style={{ color: 'red' }}>{errors.descricao}</Text>}

                            <TextInput
                                style={styles.input}
                                mode='outlined'
                                label='Tipo'
                                value={values.tipo}
                                onChangeText={handleChange('tipo')}
                                onBlur={handleBlur('tipo')}
                                error={touched.tipo && errors.tipo}
                             />
                            
                            {(touched.tipo && errors.tipo) && <Text style={{ color: 'red' }}>{errors.tipo}</Text>}


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
        margin: 50
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