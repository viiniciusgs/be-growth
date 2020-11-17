import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

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
        const { photos } = this.state;

        return (
            <div className="photos-list">
                {photos.map(photos => (
                    <article key={photos.id}>
                        <img src={photos.url} alt={photos.title}></img>
                    </article>
                ))}
            </div>
        )
    }
}
