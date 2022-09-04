import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
  input: {
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#292929',
  },
  focusedInput: {
    borderBottomColor: 'red',
  },
  button: {
    backgroundColor: '#0EB14B',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  formItem: {
    marginBottom: 24,
  },
});

export default styles;
