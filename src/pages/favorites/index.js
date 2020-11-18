import React, { Component } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import { MdFavorite } from 'react-icons/md';

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

        if(photos.length === 0) {
            return (
                <div className="photos-list">
                    <Header />

                    <main id="main">   
                        <h1>Adicione favoritos! Os favoritos que você adicionar aparecerão aqui.</h1>
                    </main>
                </div>
            )
        }

        return (
            <div className="photos-list">
                <Header />

                <main id="main">   
                    {photos.map(photo => {
                        return(
                            <div className="content">
                                <article key={photo.id}>
                                    <img src={photo.url} alt={photo.title} />

                                    <div className="description">
                                        <div className="idS">
                                            <img src={photo.thumbnailUrl} alt={photo.title} />
                                            <strong>ID do Álbum: {photo.albumId}</strong>
                                            <strong>ID da Foto: {photo.id}</strong>
                                        </div>
                                        
                                        <h1>{photo.title}</h1>
                                    </div>
                                </article>

                                <button 
                                    onClick={() => {
                                        this.removeFavorite(photo.id);
                                        this.loadPhotos();
                                    }}
                                >
                                    <MdFavorite size={20} className="favorite" />
                                </button>
                            </div>
                        );
                    })}
                </main>
            </div>
        )
    }
}
