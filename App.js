import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import {InputField} from './components/InputField';
import {arrNiño} from './api';

const App = () => {
  const initialValue = {
    altura: '',
    peso: '',
  };
  const [valores, setValores] = useState(initialValue);
  const [score, setScore] = useState('');
  const [referencia, setReferencia] = useState();

  const Control = (key, value) => {
    setValores(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = value => {
    const decimales = value - Math.trunc(value);
    const nEntero = value - decimales;

    const AjusteFuncion = ajuste => {
      const nFinal = nEntero + ajuste;

      const datos = arrNiño.filter(item => item['Length (cm)'] == nFinal);
      setReferencia(JSON.stringify(datos));

      const n3 = datos[0]['-3 SD'];
      const n2 = datos[0]['-2 SD'];
      const n1 = datos[0]['-1 SD'];
      const n0 = datos[0].Median;
      const p1 = datos[0]['1 SD'];
      const p2 = datos[0]['2 SD'];
      const p3 = datos[0]['3 SD'];

      if (valores.peso < 0) {
        setScore('INVALIDO');
      }
      if (valores.peso > 0 && valores.peso <= n3) {
        console.log('hola');
        setScore(-3);
      }
      if (valores.peso > n3 && valores.peso <= n2) {
        setScore(-2);
      }
      if (valores.peso > n2 && valores.peso <= n1) {
        setScore(-1);
      }
      if (valores.peso > n1 && valores.peso <= n0) {
        setScore(0);
      }
      if (valores.peso > n0 && valores.peso <= p1) {
        setScore(1);
      }
      if (valores.peso > p1 && valores.peso <= p2) {
        setScore(2);
      }
      if (valores.peso > p2 && valores.peso <= p3) {
        setScore(3);
      }
      if (valores.peso > p3) {
        setScore('INVALIDO');
      }

    };

    if (decimales >= 0 && decimales <= 0.25) {
      AjusteFuncion(0);
    }
    if (decimales > 0.25 && decimales <= 0.75) {
      AjusteFuncion(0.5);
    }
    if (decimales > 0.75 && decimales <= 0.99) {
      AjusteFuncion(1);
    }
  };

  return (
    <>
      <View style={tailwind('w-full bg-blue-500 py-5')}>
        <Text style={tailwind('text-2xl text-center font-bold text-white')}>
          Caritas App
        </Text>
      </View>
      <View style={tailwind('m-8')}>
        <InputField
          label="altura"
          unidad="cm"
          placeholder="Ej. 75"
          onChangeText={text => Control('altura', text)}
          value={valores.altura}
        />
        <InputField
          label="peso"
          unidad="Kg"
          placeholder="Ej. 20"
          onChangeText={text => Control('peso', text)}
          value={valores.peso}
        />
        <Button
          style={tailwind('bg-blue-500 text-white py-5')}
          title="Enviar"
          onPress={() => handleSubmit(valores.altura)}
        />
        <View style={tailwind('flex mt-20 items-center h-full')}>
          <Text style={tailwind('text-2xl font-bold uppercase')}>
            Score: {score}
          </Text>
          <Text style={tailwind('text-sm')}>{referencia}</Text>
        </View>
      </View>
    </>
  );
};

export default App;
