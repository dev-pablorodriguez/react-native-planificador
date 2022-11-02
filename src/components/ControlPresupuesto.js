import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import globalStyles from '../styles'
import { formatearCantidadDolar }  from '../helpers'

const ControlPresupuesto = ({ presupuesto, gastos }) => {
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect( () => {
        const totalGastado = gastos.reduce( ( total, item ) => {
            return total + Number(item.cantidadGasto)
        }, 0);

        const totalDisponible = presupuesto - totalGastado;

        setDisponible(totalDisponible);
        setGastado(totalGastado);
    }, [ gastos ])

    return (
        <View style={ styles.contenedor }>
            <View style={ styles.centrarGrafica }>
                <Image style={ styles.imagen } source={ require('../img/grafico.jpg') }/>
            </View>

            <View style={ styles.contenedorTexto }>
                <Text style={ styles.valor }>
                    <Text style={ styles.label }>Presupuesto: {''}</Text>
                    { formatearCantidadDolar(presupuesto) }
                </Text>

                <Text style={ styles.valor }>
                    <Text style={ styles.label }>Disponible: {''}</Text>
                    { formatearCantidadDolar(disponible) }
                </Text>

                <Text style={ styles.valor }>
                    <Text style={ styles.label }>Gastado: {''}</Text>
                    { formatearCantidadDolar(gastado) }
                </Text>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    contenedor: globalStyles.contenedor,
    contenedorOtraFormaDeUso: {
        ...globalStyles.contenedor
    },
    centrarGrafica: {
        alignItems: 'center'
    },
    imagen: {
        width: 250,
        height: 250
    },
    contenedorTexto: {
        marginTop: 50
    },
    valor: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    label: {
        fontWeight: '700',
        color: '#3B82F6'
    }
})

export default ControlPresupuesto