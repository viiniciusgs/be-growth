import React, { Component } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import Pagination from '@material-ui/lab/Pagination';

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
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
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
        const { photos, searchPhoto } = this.state;

        if(searchPhoto) {
            return(
                <div>
                    <Header />
                    <article key={searchPhoto.id}>
                        <img src={searchPhoto.url} alt={searchPhoto.title}></img>
                    </article>
                </div>
            )
        }

        return (
            <div className="photos-list">
                <Header />

                <main>
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
                        <div className="pagination">
                            <Pagination count={10} color='primary' variant="outlined" shape="rounded" onChange={(event, page) => {
                                this.loadPhotos(page);
                            }} />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
