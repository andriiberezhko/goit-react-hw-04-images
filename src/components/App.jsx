import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Alert from './Alert/Alert';
import Modal from './Modal/Modal';
import fetchImages from 'Api/Api';

export class App extends React.Component {
  state = {
    images: [],
    search: '',
    page: 0,
    loading: false,
    error: null,
    showModal: false,
    largeImgUrl: '',
  };
  // запрос на бэкэнд
  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevSearch = prevState.search;
    const nextSearch = this.state.search;

    if (prevPage !== nextPage || prevSearch !== nextSearch) {
      this.setState({ loading: true });
      fetchImages(this.state.search, this.state.page)
        .then(data => {
          if (data.total === 0) {
            return Promise.reject(new Error());
          }
          this.setState(({ images }) => {
            return {
              images: images.concat(data),
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  // изменяем стейт по результатам поиска
  onSubmitSearch = search => {
    this.setState(prevState => {
      return {
        images: [],
        search,
        page: 1,
        error: null,
      };
    });
  };
  // добавляем страницу по клику по кнопке Load more
  onLoadMoreBtnClick = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };
  // изменяем стейт для открытия модалки
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  // добавляем в стейт ссылку на большое изображение и открываем модалку
  handleImg = largeUrl => {
    this.setState({ largeImgUrl: largeUrl });
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { loading, error, showModal, images, largeImgUrl } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmitSearch} />
        {error && <Alert />}

        {images.length > 0 && (
          <>
            <ImageGallery imgs={this.state.images} onClick={this.handleImg} />
            <Button onClick={this.onLoadMoreBtnClick} />
          </>
        )}
        {loading && <Loader />}
        {showModal && <Modal onClose={this.toggleModal} src={largeImgUrl} />}
      </div>
    );
  }
}
