import React, { Component } from 'react';
import axios from 'axios';
import { Options } from '../templates';

class SubBreeds extends Component {
  state = {
    subBreeds: [],
    imgLabel: "",
    imgUrl: ""
  }

  componentDidMount() {
    axios
      .get(`https://dog.ceo/api/breed/${this.props.match.params.breed}/list`)
      .then(result => {this.setState({subBreeds: result.data.message})})
      .catch( (reason: any) => console.log('You don\'t have any breeds!'));
    axios
      .get(`https://dog.ceo/api/breed/${this.props.match.params.breed}/images`)
      .then(result => {
        this.setState({
          imgLabel: this.state.subBreeds[0],
          imgUrl: result.data.message[0]
        })})
        .catch( (reason: any) => console.log('failed to catch pupper!'));
  }

  render() {
    return (
      <div>
        <Options title={`Sub-breeds`} subtitle={this.props.match.params.breed.toUpperCase()} list={this.state.subBreeds.map(breed => {
          return {label: breed, path: ``}
        })} imgLabel={this.state.imgLabel} imgUrl={this.state.imgUrl} />
      </div>
    )
  }
}

export default SubBreeds;