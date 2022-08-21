import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface StepProps {
  stepName: string;
}

export const Step = ({ stepName }: StepProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>{stepName}</Text>
        <TextInput style={styles.input} />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Próxima etapa</Text>
      </TouchableOpacity>
    </View>
  );
};
