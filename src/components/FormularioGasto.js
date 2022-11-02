import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../styles'

const FormularioGasto = ({ 
    setModalFormularioGasto, 
    handleGasto, 
    gastoAux, 
    setGastoAux,
    eliminarGasto
    }) => {
    const [nombreGasto, setNombreGasto] = useState('');
    const [cantidadGasto, setCantidadGasto] = useState('');
    const [categoriaGasto, setCategoriaGasto] = useState('');
    const [idGasto, setIdGasto] = useState('');
    const [fechaGasto, setFechaGasto] = useState('');

    useEffect( () => {
        if(gastoAux?.nombreGasto){
            setNombreGasto(gastoAux.nombreGasto);
            setCantidadGasto(gastoAux.cantidadGasto);
            setCategoriaGasto(gastoAux.categoriaGasto);
            setIdGasto(gastoAux.idGasto);
            setFechaGasto(gastoAux.fechaGasto);
        }
    }, [ gastoAux ])

    return (
        <SafeAreaView style={ styles.contenedor }>
            <View style={ styles.contenedorBotones }>
                <Pressable 
                    onLongPress={ () => {
                        setModalFormularioGasto(false);
                        setGastoAux({});
                    }} 
                    style={[ styles.btn, styles.btnCancelar ]}
                >
                    <Text style={ styles.btnTexto }>Cancelar</Text>
                </Pressable>

                <Pressable 
                    onLongPress={ () => {
                        // setModalFormularioGasto(false);
                        // setGastoAux({});
                        eliminarGasto(idGasto)
                    }} 
                    style={[ styles.btn, styles.btnEliminar ]}
                >
                    <Text style={ styles.btnTexto }>Eliminar</Text>
                </Pressable>
            </View>

            <View style={ styles.form }>
                <Text style={ styles.title }>
                    { gastoAux?.nombreGasto ? 'Editar Gasto' : 'Nuevo Gasto' }
                </Text>

                <View style={ styles.formField }>
                    <Text style={ styles.label }>Nombre Gasto</Text>
                    <TextInput 
                        style={ styles.input }
                        placeholder='Nombre del gasto. Ej. Comida' 
                        value={ nombreGasto }
                        onChangeText={ setNombreGasto }
                    />
                </View>

                <View style={ styles.formField }>
                    <Text style={ styles.label }>Cantidad Gasto</Text>
                    <TextInput 
                        style={ styles.input }
                        placeholder='Cantidad del gasto. Ej. 300' 
                        keyboardType='numeric' 
                        value={ cantidadGasto }
                        onChangeText={ setCantidadGasto }
                    />
                </View>

                <View style={ styles.formField }>
                    <Text style={ styles.label }>Categoría Gasto</Text>
                    <Picker 
                        style={ styles.input } 
                        selectedValue={ categoriaGasto } 
                        onValueChange={ setCategoriaGasto }
                    >
                        <Picker.Item label='-- Seleccione --' value='' />
                        <Picker.Item label='Ahorro' value='ahorro' />
                        <Picker.Item label='Comida' value='comida' />
                        <Picker.Item label='Casa' value='casa' />
                        <Picker.Item label='Gastos Varios' value='varios' />
                        <Picker.Item label='Ocio' value='ocio' />
                        <Picker.Item label='Salud' value='salud' />
                        <Picker.Item label='Suscripciones' value='suscripciones' />
                    </Picker>
                </View>

                <Pressable 
                    style={ styles.btnSubmit } 
                    onPress={ () => handleGasto({ 
                                            nombreGasto, 
                                            cantidadGasto, 
                                            categoriaGasto, 
                                            idGasto, 
                                            fechaGasto }) }
                >
                    <Text style={ styles.btnSubmitTexto }>
                        { gastoAux?.nombreGasto ? 'Guardar Cambios Gasto' : 'Agregar Gasto' }
                    </Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#1E40AF',
        flex: 1
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10,
        flex: 1
    },
    btnCancelar: {
        backgroundColor: '#DB2777',
    },
    btnEliminar: {
        backgroundColor: 'red'
    },
    btnTexto: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF'
    },
    form: {
        ...globalStyles.contenedor
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        color: '#64748B'
    },
    formField: {
        marginVertical: 10
    },
    label: {
        color: '#64748B',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    btnSubmit: {
        backgroundColor: '#3B82F6',
        padding: 10,
        marginTop: 20
    },
    btnSubmitTexto: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})

export default FormularioGasto