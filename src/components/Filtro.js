import React, { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../styles'

const Filtro = ({ filtro, setFiltro, gastos, setGastosFiltrados }) => {

    useEffect( () => {
        if(filtro === ''){
            setGastosFiltrados(gastos);
        }else{
            const gastosFiltrados = gastos.filter( gasto => gasto.categoriaGasto === filtro);
            setGastosFiltrados(gastosFiltrados);
        }
    }, [ filtro ])

    return (
        <View style={ styles.contenedor }>
            <Text style={ styles.label }>Filtrar Gastos</Text>

            <Picker 
                style={ styles.input } 
                selectedValue={ filtro } 
                onValueChange={ setFiltro }
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
    )
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor,
        transform: [{ translateY: 0 }],
        marginTop: 80
    },
    label: {
        fontSize: 22,
        fontWeight: '900',
        color: '#64748B'
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
})

export default Filtro