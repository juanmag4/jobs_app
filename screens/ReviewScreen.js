import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, StyleSheet, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from "expo";

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Review Jobs',
      headerRight: (
        <Button
          title="Settings"
          onPress={() => navigation.navigate('settings')}
          type="clear"
        />
      ),
      headerTitleStyle: {
        marginTop: Platform.OS === "android" ? 24 : 0
      }
    }
  };

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      console.log(job);
      const { company, post_date, apply_url, title } = job;
      const initialRegion = {
        longitude: company.location.longitude,
        latitude: company.location.latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.002
      };

      return (
        <Card title={title} key={job.id}>
          <View style={{ height: 200 }}>
            <MapView style={{ flex: 1 }} cacheEnabled={Platform.OS === 'android'} scrollEnabled={false} initialRegion={initialRegion} />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company.name}</Text>
              <Text style={styles.italics}>{post_date}</Text>
            </View>
          </View>
          <Button title="Apply Now" onPress={() => Linking.openURL(apply_url)} />
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
});

const mapStateToProps = (state) => {
  // console.log(state);
  return { likedJobs: state.likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);
