import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function DismissKeyboard({ children }: { children: React.ReactNode }) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  );
}