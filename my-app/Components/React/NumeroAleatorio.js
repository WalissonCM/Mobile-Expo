import { View ,Text } from "react-native"
import React from "react";

export default function NumeroAleatorio(props) {
    
    const { min, max } = props
    const numero = max - min
    const numeroAleatorio = Math.floor(Math.random() * numero) + min
    
    return (
      <View>
        <Text>numero aleatorio é {numeroAleatorio}</Text>
      </View>
    )
}  

