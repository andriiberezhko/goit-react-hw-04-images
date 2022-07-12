import React from 'react';
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Alert from './Alert/Alert';
import Modal from './Modal/Modal';
import fetchImages from 'Api/Api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImgUrl, setLargeImgUrl] = useState('');

  // запрос на бекэнд
  useEffect(() => {
    if (search === '') return;
    setLoading(true);
    fetchImages(search, page)
      .then(data => {
        if (data.length === 0) {
          return Promise.reject(new Error());
        }
        setImages(state => state.concat(data));
      })
      .catch(error => setError(state => !state))
      .finally(() => {
        setLoading(false);
      });
  }, [page, search]);

  // изменяем стейт по результатам поиска
  const onSubmitSearch = search => {
    setImages([]);
    setSearch(search);
    setPage(1);
    setError(false);
  };

  // добавляем страницу по клику по кнопке Load more
  const onLoadMoreBtnClick = () => {
    setPage(state => state + 1);
  };

  // изменяем стейт для открытия модалки
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  // добавляем в стейт ссылку на большое изображение и открываем модалку
  const handleImg = largeUrl => {
    setLargeImgUrl(largeUrl);
    setShowModal(!showModal);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmitSearch} />
      {error && <Alert />}

      {images.length > 0 && (
        <>
          <ImageGallery imgs={images} onClick={handleImg} />
          <Button onClick={onLoadMoreBtnClick} />
        </>
      )}
      {loading && <Loader />}
      {showModal && <Modal onClose={toggleModal} src={largeImgUrl} />}
    </div>
  );
};

// export default App;

// export class App extends React.Component {
//   state = {
//     images: [],
//     search: '',
//     page: 0,
//     loading: false,
//     error: null,
//     showModal: false,
//     largeImgUrl: '',
//   };
//   // запрос на бэкэнд
//   componentDidUpdate(prevProps, prevState) {
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;
//     const prevSearch = prevState.search;
//     const nextSearch = this.state.search;

//     if (prevPage !== nextPage || prevSearch !== nextSearch) {
//       this.setState({ loading: true });
// fetchImages(this.state.search, this.state.page)
//   .then(data => {
//     if (data.total === 0) {
//       return Promise.reject(new Error());
//     }
//     this.setState(({ images }) => {
//       return {
//         images: images.concat(data),
//       };
//     });
//   })
//   .catch(error => this.setState({ error }))
//   .finally(() => {
//     this.setState({ loading: false });
//   });
//     }
//   }

// // изменяем стейт по результатам поиска
// onSubmitSearch = search => {
//   this.setState(prevState => {
//     return {
//       images: [],
//       search,
//       page: 1,
//       error: null,
//     };
//   });
// };
// // добавляем страницу по клику по кнопке Load more
// onLoadMoreBtnClick = () => {
//   this.setState(prevState => {
//     return {
//       page: prevState.page + 1,
//     };
//   });
// };
// // изменяем стейт для открытия модалки
// toggleModal = () => {
//   this.setState(({ showModal }) => ({
//     showModal: !showModal,
//   }));
// };
// // добавляем в стейт ссылку на большое изображение и открываем модалку
// handleImg = largeUrl => {
//   this.setState({ largeImgUrl: largeUrl });
//   this.setState(({ showModal }) => ({
//     showModal: !showModal,
//   }));
// };

//   render() {
//     const { loading, error, showModal, images, largeImgUrl } = this.state;
// return (
//   <div className="App">
//     <Searchbar onSubmit={this.onSubmitSearch} />
//     {error && <Alert />}

//     {images.length > 0 && (
//       <>
//         <ImageGallery imgs={this.state.images} onClick={this.handleImg} />
//         <Button onClick={this.onLoadMoreBtnClick} />
//       </>
//     )}
//     {loading && <Loader />}
//     {showModal && <Modal onClose={this.toggleModal} src={largeImgUrl} />}
//   </div>
// );
//   }
// }
