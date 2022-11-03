import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import globalStyles from '../styles'
import { formatearCantidadDolar }  from '../helpers'
import CircularProgress from 'react-native-circular-progress-indicator' 

const ControlPresupuesto = ({ presupuesto, gastos, resetApp }) => {
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect( () => {
        const totalGastado = gastos.reduce( ( total, item ) => {
            return total + Number(item.cantidadGasto)
        }, 0);

        const totalDisponible = presupuesto - totalGastado;

        const nuevoPorcentaje = totalGastado*100/presupuesto;

        setDisponible(totalDisponible);
        setGastado(totalGastado);
        setTimeout( () => setPorcentaje(nuevoPorcentaje), 1000 )
    }, [ gastos ])

    return (
        <View style={ styles.contenedor }>
            <View style={ styles.centrarGrafica }>
                <CircularProgress 
                    value={ porcentaje } 
                    duration={ 500 }
                    radius={ 150 }
                    valueSuffix={ '%' }
                    title='Gastado'
                    inActiveStrokeColor='#F5F5F5'
                    inActiveStrokeWidth={ 20 }
                    activeStrokeColor='#3B82F6'
                    activeStrokeWidth={ 20 }
                    titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                    titleColor='#64748B'
                />
            </View>

            <View style={ styles.contenedorTexto }>
                <Pressable style={ styles.btnReset } onLongPress={ resetApp }>
                    <Text style={ styles.btnResetTexto } >Reiniciar App</Text>
                </Pressable>

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
    contenedorTexto: {
        marginTop: 50
    },
    btnReset: {
        backgroundColor: '#DB2777',
        padding: 10,
        marginBottom: 40,
        borderRadius: 5,
    },
    btnResetTexto: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
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