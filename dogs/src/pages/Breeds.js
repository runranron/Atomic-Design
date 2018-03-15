import React, { Component } from 'react';
import axios from 'axios';
import { Options } from '../templates';
import { Link } from 'react-router-dom';

class Breeds extends Component {
  state = {
    breeds: [],
    imgLabel: "",
    imgUrl: ""
  }

  filterBreeds(breeds) {
    const choiceBreeds = {
      hound: "hound",
      retriever: "retriever",
      terrier: "terrier",
      poodle: "poodle",
      setter: "setter"
    }

    return breeds.filter(breed => choiceBreeds[breed]);
  }

  componentDidMount() {
    axios
      .get('https://dog.ceo/api/breeds/list')
      .then(result => {
        this.setState({breeds: this.filterBreeds(result.data.message)})})
      .catch( (reason: any) => console.log('You don\'t have any breeds!'));
    axios
      .get(`https://dog.ceo/api/breed/hound/images`)
      .then(result => {
        this.setState({
          imgLabel: this.state.breeds[0],
          imgUrl: result.data.message[0]
        })})
        .catch( (reason: any) => console.log('failed to catch pupper!'));
  }

  render() {
    return (
      <div>
        <Options title="Breeds" subtitle="Some Doggies Breed" list={this.state.breeds.map(breed => {
          return {label: breed, path: `/subbreeds/${breed}`}
        })} imgLabel={this.state.imgLabel} imgUrl={this.state.imgUrl} />
      </div>
    )
  }
}

export default Breeds;