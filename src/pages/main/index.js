import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Main extends Component {
    state = {
        photos: [],
        page: 1 
    }

    componentDidMount() {
        this.loadPhotos();
    }

    loadPhotos = async (page = 1) => {
        const response = await api.get(`/photos/${page}`);

        this.setState({ photos: response.data, page })
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
        const { photos, page } = this.state;

        return (
            <div className="photos-list">
                <article key={photos.id}>
                    <img src={photos.url} alt={photos.title}></img>
                </article>

                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === photos.length} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}