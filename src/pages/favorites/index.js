import React, { Component } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import './styles.css';

export default class Favorites extends Component {
    state = {
        photos: []
    }

    componentDidMount() {
        this.loadPhotos();
    }

    loadPhotos = async () => {
        const response = await api.get('/photos');
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const arrayFavorites = [];

        for (let item of response.data) {
            if(favorites.indexOf(item.id) !== -1) {
                arrayFavorites.push(item);
            }
        }

        this.setState({ photos: arrayFavorites });
    }

    removeFavorite = (id) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.indexOf(id);

        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.loadPhotos();
    }

    render() {
        const { photos } = this.state;

        return (
            <div className="photos-list">
                <Header />
                
                <main>
                    {photos.map(photo => {
                        return(
                            <article key={photo.id}>
                                <img src={photo.url} alt={photo.title}></img>
                                <button onClick={() => this.removeFavorite(photo.id)}>Desfavoritar</button>
                            </article>
                        )
                    })}
                </main>
            </div>
        )
    }
}
