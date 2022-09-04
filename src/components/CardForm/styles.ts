import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    marginVertical: 20,
  },
});

export default styles;
