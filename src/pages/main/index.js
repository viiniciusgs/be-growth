import React, { Component } from 'react';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        photos: []
    }

    componentDidMount() {
        this.loadPhotos();
    }

    loadPhotos = async () => {
        const response = await api.get('/photos');

        this.setState({ photos: response.data })
    }

    render() {
        return (
            <div className="photos-list">
                {this.state.photos.map(photos => (
                    <h2 key={photos.id}>{photos.url}</h2>
                ))}
            </div>
        )
    }
}
