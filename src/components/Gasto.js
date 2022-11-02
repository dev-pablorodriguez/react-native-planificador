import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import globalStyles from '../styles'
import { formatearCantidadDolar, formatearFecha } from '../helpers'

const diccionarioIconos = {
    ahorro: require('../img/icono_ahorro.png'),
    comida: require('../img/icono_comida.png'),
    casa: require('../img/icono_casa.png'),
    varios: require('../img/icono_gastos.png'),
    ocio: require('../img/icono_ocio.png'),
    salud: require('../img/icono_salud.png'),
    suscripciones: require('../img/icono_suscripciones.png'),
}

const Gasto = ({ gasto, setModalFormularioGasto, setGastoAux }) => {
    const { nombreGasto, cantidadGasto, categoriaGasto, fechaGasto } = gasto

    handleAcciones = () => {
        setModalFormularioGasto(true);
        setGastoAux(gasto);
    }

    return (
        <Pressable onLongPress={ handleAcciones }>
            <View style={ styles.contenedor }>
                <View style={ styles.contenido } >
                    <View style={ styles.contenedorImagen }>
                        <Image style={ styles.imagen } source={ diccionarioIconos[categoriaGasto] } />

                        <View style={ styles.contenedorTexto }>
                            <Text style={ styles.textoCategoriaGasto }>{ categoriaGasto }</Text>
                            <Text style={ styles.textoNombreGasto }>{ nombreGasto }</Text>
                            <Text style={ styles.textoFechaGasto }>{ formatearFecha(fechaGasto) }</Text>
                        </View>
                    </View>

                    <Text 
                        style={ styles.textoCantidadGasto }
                    >
                        { formatearCantidadDolar(cantidadGasto) }
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor,
        marginBottom: 20
    },
    contenido: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contenedorImagen: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    imagen: {
        width: 80,
        height: 80,
        marginRight: 20
    },
    contenedorTexto: {
        flex: 1
    },
    textoCategoriaGasto: {
        color: '#94A3B8',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    textoNombreGasto: {
        color: '#64748B',
        fontSize: 22,
        marginBottom: 5
    },
    textoFechaGasto: {
        fontWeight: '700',
        color: '#DB2777'
    },
    textoCantidadGasto: {
        fontSize: 20,
        fontWeight: '700'
    }
})

export default Gasto