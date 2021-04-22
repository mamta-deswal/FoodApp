/**Slider of Rider App */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import AppIntroSlider from '../../../customlibrary/react-native-app-intro-slider';
const SCREEN_WIDTH = Dimensions.get('window').width;
const NEXT_BUTTON_WIDTH = .48 * SCREEN_WIDTH
export default class IntroSlider extends Component {
  constructor(props) {
    super(props);

    this.slides = [
      {
        key: 'one',
        title: 'Be a part of Tech.',
        text: '',
        image: require('../../assets/images/onboard1.jpg'),

      },
      {
        key: 'two',
        title: 'Be a part of Tech.',
        text: '',
        image: require('../../assets/images/onboard2.jpg'),

      },
      {
        key: 'three',
        title: 'Be a part of Tech.',
        text: '',
        image: require('../../assets/images/onboard3.jpg'),

      }
    ];
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.img} source={item.image} />
      </View>
    );
  }
  /** After final submit go ot Auth Screens*/
  _onDone = () => {
    this.props.navigation.navigate("Home");
  };

  _renderNextButton = (x) => {
    return (
      <View style={{
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        width: NEXT_BUTTON_WIDTH, height: NEXT_BUTTON_WIDTH * .24,
        backgroundColor: 'white', borderTopLeftRadius: 42, borderBottomLeftRadius: 42,
      }} >
        <Text style={{ fontSize: 22, lineHeight: 27, textAlignVertical: 'center', color: '#492897' }}>Next</Text>
        <Image resizeMode={'stretch'} style={{ width: 30, height: 25, marginLeft: 24 }}
          source={require('../../assets/images/intro_slider_arrow.png')} />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <AppIntroSlider
          data={this.slides}
          renderItem={this._renderItem}
          // renderPagination={this._renderPagination}
          renderNextButton={this._renderNextButton}
          renderDoneButton={this._renderNextButton}
          onDone={this._onDone}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },

  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  }
});
