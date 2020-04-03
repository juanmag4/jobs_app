import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Card, Button, Icon } from 'react-native-elements';

import { Swipe } from '../components/Swipe';
// import { jobs, likeJob } from '../reducers';
import { likeJob } from '../actions';

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="description" size={30} color={tintColor} />
    }
  };

  renderCard(job) {
    const initialRegion = {
      latitude: job.company.location.latitude,
      longitude: job.company.location.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={job.title}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company.name}</Text>
          <Text>{job.post_date}</Text>
        </View>
        <Text>{job.description.replace(/(<([^>]+)>)/ig, '')}</Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">
        <Button title="Back to Map" large icon={{ name: 'my-location'}} onPress={() => this.props.navigation.navigate('map')} />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 25 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10
  }
});

const mapStateToProps = ({ jobs }) => {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps, { likeJob })(DeckScreen);
