import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import React, { useState } from 'react'

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function Cronometro() {
  
    const [numero, setNumero] = useState("00:00:00");
    const [botao, setBotao] = useState("Iniciar");
    const [ultimo, setUltimo] = useState(null);
    
    function iniciar(){
      if(timer !== null){

        clearInterval(timer);
        timer = null;
  
        setBotao("Iniciar")
      } else {
       
        timer = setInterval(()=>{
          ss++;
  
          if(ss==60){
            ss = 0;
            mm++;
          } else if(mm == 60){
            mm = 0;
            hh++;
          }
  
          let format = 
          (hh < 10 ? "0" + hh : hh) + ":" 
          + (mm < 10 ? "0" + mm : mm) + ":"
          + (ss < 10 ? "0" + ss : ss);
  
          setNumero(format);
  
          
        }, 1000);
  
        setBotao("Parar");
      }
    }
  
    function reniciar(){
      if (timer !== null){
        
        clearInterval(timer);
        timer = null;
      }
  
      setUltimo(numero);
      setNumero("00:00:00");
      ss = 0;
      mm = 0;
      hh = 0;
      setBotao("Iniciar");
    }

 
    return (
        <View style={styles.container}>
        <Image source={require("my-app/src/image/crono.png")} />
        <Text style={styles.timer}>{numero}</Text>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={iniciar}>
            <Text style={styles.btnTexto}>{botao}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={reniciar}>
            <Text style={styles.btnTexto}> Reniciar </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.areaUltima}>
          <Text style={styles.textoCorrida}>{ultimo ? "Último tempo: " + ultimo : null}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ec9454",
      },
      timer:{
        marginTop: -165,
        fontSize: 45,
        textAlign: "center",
        fontWeight: "bold",
        color: "#f2f18b",
        backgroundColor: "#913c44",
        borderRadius: 19,
        width: 200,
        
      },
      btnArea:{
        flexDirection: "row",
        marginTop: 130,
        height: 40,
      },
      btn:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c6cd78",
        height: 40,
        margin: 17,
        borderRadius: 19,
        
      },
      btnTexto:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#8e3242",
      },
      areaUltima:{
        marginTop: 40,
      },
      textoCorrida:{
        fontSize: 23,
        color: "#8e3242",
        fontStyle: "italic"
      }
    })
