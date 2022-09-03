import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
  input: {
    backgroundColor: '#303030',
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
    fontFamily: 'Roboto-Regular',
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  disabled: {
    opacity: 0.5,
  },
  previousButton: {
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: 10,
  },
  previousButtonText: {
    color: '#fff',
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    marginTop: 10,
  },
});

export default styles;
