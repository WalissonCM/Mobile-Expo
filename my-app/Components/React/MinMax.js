import { View ,Text } from "react-native"

export default function MinMax (props) {

  const {min=10, max=20} = props
  console.warn(min + "  " + max)
    
    return (
      <View>
        <Text>{max} é maior que {min}</Text>
      </View>
    )
} 
