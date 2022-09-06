import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 8,
    marginTop: 16,
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  title: {
    color: '#8b8b8b',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    marginVertical: 20,
  },
});

export default styles;
