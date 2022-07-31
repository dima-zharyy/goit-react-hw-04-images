import { useState, useEffect } from 'react';
import {
  Searchbar,
  ImageGallery,
  LoadButton,
  Modal,
  Loader,
  Notification,
  notify,
} from 'components';
import { fetchImages } from 'service';
import { getProperData } from 'helpers';
import { AppContainer } from './App.styled';
import 'react-toastify/dist/ReactToastify.min.css';

export const App = () => {
  const [query, setQuery] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageData, setLargeImageData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (!query[0]) {
      return;
    }

    setShowSpinner(true);

    fetchImages(query, page)
      .then(data => {
        if (data.totalHits === 0) {
          return Promise.reject(`There is no result on query: ${query}`);
        }
        setImagesData(state => [...state, ...getProperData(data)]);
        setTotalHits(data.totalHits);
      })
      .catch(message => notify(message))
      .finally(() => setShowSpinner(false));
  }, [query, page]);

  const handleOpenModal = event => {
    const { largeImageUrl } = event.target.dataset;
    const tags = event.target.alt;

    setLargeImageData({ largeImageUrl, tags });
    setShowModal(state => !state);
  };

  const handleCloseModal = () => {
    setShowModal(state => !state);
    setLargeImageData({});
  };

  const handleLoadClick = () => {
    setPage(state => state + 1);
  };

  const handleSubmit = query => {
    if (!query[0]) {
      notify('Please type at least one letter!');
      return;
    }

    setQuery(query);
    setPage(1);
    setImagesData([]);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery onOpenModal={handleOpenModal} images={imagesData} />

      {imagesData.length === 0 || imagesData.length === totalHits
        ? null
        : !showSpinner && <LoadButton onClick={handleLoadClick} />}

      {showSpinner && <Loader />}

      {showModal ? (
        <Modal onClose={handleCloseModal}>
          <img src={largeImageData.largeImageUrl} alt={largeImageData.tags} />
        </Modal>
      ) : null}

      <Notification />
    </AppContainer>
  );
};
