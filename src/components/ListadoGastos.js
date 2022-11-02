import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Gasto from './Gasto'

const ListadoGastos = ({ 
    gastos, 
    setModalFormularioGasto, 
    setGastoAux, 
    filtro, 
    gastosFiltrados 
}) => {
  return (
    <View style={ styles.contenedor }>
        <Text style={ styles.title }>Gastos</Text>

        { 
            filtro ? 
            gastosFiltrados.map( gasto => <Gasto 
                                            key={ gasto.idGasto } 
                                            gasto={ gasto } 
                                            setModalFormularioGasto={ setModalFormularioGasto }
                                            setGastoAux={ setGastoAux }
                                            />)
            :
            gastos.map( gasto => <Gasto 
                                    key={ gasto.idGasto } 
                                    gasto={ gasto } 
                                    setModalFormularioGasto={ setModalFormularioGasto }
                                    setGastoAux={ setGastoAux }
                                    />)
        }




        { 
            gastos.length === 0 ?
            <Text style={ styles.noGastos }>No hay gastos.</Text>
            :
            filtro && gastosFiltrados.length === 0 && <Text style={ styles.noGastos }>No hay gastos.</Text>
        }

    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        marginTop: 30,
        marginBottom: 100
    },
    title: {
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20
    },
    noGastos: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20
    }
})

export default ListadoGastos