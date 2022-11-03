import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Pressable,
  Image,
  Modal
} from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage'
import Header from './src/components/Header'
import NuevoPresupuesto from './src/components/NuevoPresupuesto'
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import { generarId } from './src/helpers'


const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modalFormularioGasto, setModalFormularioGasto] = useState(false);
  const [gastoAux, setGastoAux] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect( () => {
    const getPresupuestoStorage = async () => {
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto');
        //Number retorna 0 si parámetro es null
        const formateado = Number(JSON.parse(presupuestoStorage));
        if(formateado > 0){
          setPresupuesto(formateado);
          setIsValidPresupuesto(true);
        }
      } catch (error) {
        console.log(error)
      }
    }
    getPresupuestoStorage();
  }, [])

  useEffect( () => {
    if(isValidPresupuesto){
      const setPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', JSON.stringify(presupuesto));
        } catch (error) {
          console.log(error)
        }
      }
      setPresupuestoStorage();
    }
  }, [ isValidPresupuesto ])

  useEffect( () => {
    const getGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos');
        setGastos( gastosStorage ? JSON.parse(gastosStorage) : [] )
      } catch (error) {
        console.log(error)
      }
    }
    getGastosStorage();
  }, [])

  useEffect( () => {
    const setGastosStorage = async () => {
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos));
      } catch (error) {
        console.log(error)
      }
    }
    setGastosStorage();
  }, [ gastos ])

  const handleNuevoPresupuesto = ( presupuesto ) => {
    if(Number(presupuesto) > 0){
      setIsValidPresupuesto(true);
    }else{
      Alert.alert('Error', 'El presupuesto no puede ser cero o menor.')    
    }
  }

  const handleGasto = gasto => {
    // if(Object.values(gasto).includes('')){
    if([ gasto.nombreGasto, gasto.cantidadGasto, gasto.categoriaGasto ].includes('')){
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    //Revisar si es un registro nuevo o edición
    if(gasto.idGasto){
      //Edición
      //Genera un nuevo arreglo de elementos reemplazando el elemento editado, los demás los mantiene igual
      const gastosActualizados = 
        gastos.map( gastoState => gastoState.idGasto === gasto.idGasto ? gasto : gastoState);

      setGastos(gastosActualizados);
      setGastoAux({});

    }else{
      //Nuevo registro
      gasto.idGasto = generarId();
      gasto.fechaGasto = Date.now();
      setGastos([...gastos, gasto]);
    }

    setModalFormularioGasto(!modalFormularioGasto);
  }

  const eliminarGasto = idGasto => {
    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => {
          const gastosActualizados = gastos.filter( gastoState => gastoState.idGasto !== idGasto );
          setGastos(gastosActualizados);
          setGastoAux({});
          setModalFormularioGasto(!modalFormularioGasto);
        }}
      ]);
    
  }

  const resetApp = () => {
    Alert.alert(
      'Deseas resetear la app?', 
      'Esto eliminará presupuesto y gastos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: async () => {
          try {
            await AsyncStorage.clear();
            setIsValidPresupuesto(false);
            setPresupuesto(0);
            setGastos([]);
          } catch (error) {
            console.log(error)
          }
        }},
      ]
    )
  }

  return (
    <SafeAreaView style={ styles.contenedor }>

      <ScrollView>
        <View style={ styles.header }>
          <Header />
          
          { isValidPresupuesto ? 
            <ControlPresupuesto 
              presupuesto={ presupuesto }
              gastos={ gastos }
              setGastos={ setGastos }
              resetApp={ resetApp }
            /> 
            : 
            <NuevoPresupuesto 
              presupuesto={ presupuesto }
              setPresupuesto={ setPresupuesto }
              handleNuevoPresupuesto={ handleNuevoPresupuesto }
            /> 
          }
        </View>

        { isValidPresupuesto && (
          <>
            <Filtro 
              filtro={ filtro } 
              setFiltro={ setFiltro } 
              gastos={ gastos }
              setGastosFiltrados={ setGastosFiltrados }
            />

            <ListadoGastos 
              gastos={ gastos } 
              setModalFormularioGasto={ setModalFormularioGasto }
              setGastoAux={ setGastoAux }
              filtro={ filtro }
              gastosFiltrados={ gastosFiltrados }
            />
          </>
        )}

      </ScrollView>

        { modalFormularioGasto && (
          <Modal 
            visible={ modalFormularioGasto } 
            animationType='slide' 
            // onRequestClose={ () => setModalFormularioGasto(!modalFormularioGasto) }
          >
            <FormularioGasto 
              setModalFormularioGasto={ setModalFormularioGasto } 
              handleGasto={ handleGasto }
              gastoAux={ gastoAux }
              setGastoAux={ setGastoAux }
              eliminarGasto={ eliminarGasto }
            />
          </Modal>
        )}

      { isValidPresupuesto && (
        <Pressable onPress={ () => setModalFormularioGasto(!modalFormularioGasto) } >
          <Image style={ styles.imagen } source={ require('./src/img/nuevo-gasto.png') }  />
        </Pressable>
      )}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400
  },
  imagen: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 30,
    right: 30
  }
});

export default App;
