import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  title: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    alignSelf: 'center',
    width: 270,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 120,
    height: 120,
    marginTop: 50,
  },
  loading: {
    position: 'absolute',
    top: -80,
    left: 0,
    right: 0,
  },
  smartphoneContainer: {
    zIndex: 1,
  },
  smartphone: {
    width: 80,
    height: 140,
    backgroundColor: '#F2F2F4',
  },
  card: {
    height: 130,
    position: 'absolute',
  },
  error: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 50,
    left: 20,
  },
});

export default styles;
