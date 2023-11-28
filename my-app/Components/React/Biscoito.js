import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function Biscoito() {
  
    const [img, setImg] = useState(require("my-app/src/image/biscoito.png"))
    const [textFrase, setTextFrase] = useState("")
    const [bloqueado, setBloqueado] = useState(false)
    
  
    let frases = [
      "Siga os bons e aprenda com eles.",
      "O bom-senso vale mais do que muito conhecimento.",
      "O riso é a menor distância entre duas pessoas.",
      "Deixe de lado as preocupações e seja feliz.",
      "Realize o óbvio, pense no improvável e conquiste o impossível.",
      "Acredite em milagres, mas não dependa deles.",
      "A maior barreira para o sucesso é o medo do fracasso.",
    ];
  
    function quebraBiscoito() {
      let numeroAleatorio = Math.floor(Math.random() * frases.length);
      setTextFrase(' "' + frases[numeroAleatorio] + '" ');
      setImg(require("my-app/src/image/biscoitoAberto.png"));
      setBloqueado(true)
     
    }
  
    function reiniciarBiscoito() {
      setImg(require("my-app/src/image/biscoito.png"));
      setTextFrase("");
      setBloqueado(false)
    }
  
    return (
      <View style={styles.container}>
        <Image source={img} style={styles.img} />
  
        <Text style={styles.textoFrase}>{textFrase}</Text>
        <TouchableOpacity style={styles.botao} onPress={quebraBiscoito} disabled={bloqueado}>
          <View style={styles.btnArea}>
            <Text style={styles.btnTexto}>Quebrar Biscoito</Text>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[styles.botao, { marginTop: 15, borderColor: "#121212" }]}
          onPress={reiniciarBiscoito}
        >
          <View style={styles.btnArea}>
            <Text style={[styles.btnTexto, { color: "#121212" }]}>
              Reiniciar Biscoito
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      width: 250,
      height: 250,
    },
    textoFrase: {
      fontSize: 20,
      color: "#dd7b22",
      margin: 30,
      fontStyle: "italic",
      textAlign: "center",
    },
    botao: {
      width: 230,
      height: 50,
      borderColor: "#dd7b22",
      borderWidth: 2,
      borderRadius: 25,
      
    },
    btnArea: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    btnTexto: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#dd7b22",
    },
  })
