import {StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: StatusBar.currentHeight,
  },
  cardContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
});

export default styles;
