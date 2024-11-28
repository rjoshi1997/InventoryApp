import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  //Carousel
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  carouselImage: {
    height: '92%',
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
});
