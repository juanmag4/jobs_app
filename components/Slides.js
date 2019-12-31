import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export class Slides extends Component {
  renderSlides() {
    return this.props.data.map((slide, i) => {
      if (i === this.props.data.length - 1) {
        return (
          <View key={slide.text} style={[styles.slide, { backgroundColor: slide.color }]}>
            <Text style={styles.slideText}>{slide.text}</Text>
            <Button title="LogIn to Facebook" onPress={this.props.onComplete}/>
          </View>
        );
      }
      return (
        <View key={slide.text} style={[styles.slide, { backgroundColor: slide.color }]}>
          <Text style={styles.slideText}>{slide.text}</Text>
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  slideText: {
    fontSize: 30,
    color: '#FFFFFF',
    margin: 10
  }
});