import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Main extends Component {
    state = {
        photos: [],
        page: 1,
        value: '',
        searchPhoto: null
    }

    componentDidMount() {
        this.loadPhotos();
    }

    loadPhotos = async (page = 1) => {
        const response = await api.get(`/photos?_start=${(page * 10) - 10}&_limit=10`);

        this.setState({ photos: response.data, page })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if(this.state.value !== '') {
            const response = await api.get(`/photos/${this.state.value}`);

            this.setState({ searchPhoto: response.data })
        }
    }

    favorites = (id) => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.indexOf(id);
        if(index === -1) {
            favorites.push(id);
        } else {
            favorites.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    prevPage = () => {
        const { page } = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadPhotos(pageNumber);
    }    

    nextPage = () => {
        const { photos, page } = this.state;

        if(page === photos.length) return;

        const pageNumber = page + 1;

        this.loadPhotos(pageNumber);
    }

    render() {
        const { photos, page, searchPhoto } = this.state;

        if(searchPhoto) {
            return(
                <article key={searchPhoto.id}>
                    <img src={searchPhoto.url} alt={searchPhoto.title}></img>
                </article>
            )
        }

        return (
            <div className="photos-list">
                <div className="search">
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" value={this.state.value} onChange={event => this.setState({ value: event.target.value })} /> 
                    </form>
                </div>
                
                {photos.map(photo => {
                    return(
                        <article key={photo.id}>
                            <img src={photo.url} alt={photo.title}></img>
                            <button onClick={() => this.favorites(photo.id)}>Favoritar</button>
                        </article>
                    )
                })}

                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === photos.length} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}