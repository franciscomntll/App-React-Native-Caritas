import React, { useState, useEffect } from 'react';
import {View, Text, TextInput} from 'react-native';
import tailwind from 'tailwind-rn';

export const InputField = ({label, unidad, placeholder, onChangeText, value}) => {
    




  return (
    <View style={tailwind('py-2')}>
      <Text style={tailwind('text-sm mb-1 capitalize')}>{label}</Text>
      <View style={tailwind('flex justify-center')}>
      <TextInput placeholder={placeholder} style={tailwind('w-full border-gray-500 border rounded-lg px-4')} onChangeText={onChangeText} value={value} />
      <Text style={tailwind('text-sm mb-1 absolute right-10')}>{unidad}</Text>
      
      </View>
    </View>
  );
};
