import {StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F4',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: StatusBar.currentHeight,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBack: {
    position: 'absolute',
  },
  insertNumberContainer: {
    marginTop: 20,
    flex: 1,
  },
  insertNumberOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  title: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    width: 200,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 50,
    height: 50,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default styles;
