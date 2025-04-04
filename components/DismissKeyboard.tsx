import React, { ReactNode } from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

interface DismissKeyboardProps {
  children: ReactNode;
}

/**
 * A component that dismisses the keyboard when tapping outside of input fields
 */
export default function DismissKeyboard({ children }: DismissKeyboardProps) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
}