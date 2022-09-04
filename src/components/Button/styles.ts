import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  contained: {
    backgroundColor: '#212122',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: '#000',
  },
  textContained: {
    color: '#fff',
  },
  textOutlined: {
    color: '#000',
  },
});

export default styles;
