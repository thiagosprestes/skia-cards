import {StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F4',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: StatusBar.currentHeight,
  },
  cardContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
