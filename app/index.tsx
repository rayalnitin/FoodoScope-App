import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        backgroundColor:"grey",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "900", color: "white" }}>
       FoodScope App Loading...
      </Text>

    </View>
  );
}
