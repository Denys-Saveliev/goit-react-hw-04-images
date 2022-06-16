import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchImage, PER_PAGE } from '../../Service/PixabayApi';
import Searchbar from '../Searchbar';
import SearchForm from '../SearchForm';
import ImageGallery from '../ImageGallery';
import Loader from 'components/Loader';
import LoadMore from 'components/LoadMore';
import Modal from '../Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function ImageInfo() {
  const [search, setSearch] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageId, setModalImageId] = useState(null);

  useEffect(() => {
    if (search === '') {
      return;
    }

    setStatus(Status.PENDING);

    fetchImage(search, page)
      .then(data => {
        const requestedImageAmount = data.totalHits;
        if (requestedImageAmount === 0) {
          setStatus(Status.REJECTED);
          toast.error('Please insert valid request!', {
            position: 'top-left',
            autoClose: 3000,
            theme: 'colored',
          });
        }

        const loadMore = page * PER_PAGE < requestedImageAmount;

        if (page > 1) {
          setGalleryItems(state => [...state, ...data.hits]);
          setStatus(Status.RESOLVED);
          setLoadMore(loadMore);
        } else {
          setGalleryItems(data.hits);
          setStatus(Status.RESOLVED);
          setLoadMore(loadMore);
        }
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        toast.error('Code error: ' + error, {
          position: 'top-left',
          autoClose: 3000,
          theme: 'colored',
        });
      });
  }, [page, search]);

  const handleFormSubmit = search => {
    setSearch(search);
    setPage(1);
  };

  const incrementPage = () => {
    setPage(state => state + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleGalleryItemClick = id => {
    setModalImageId(id);
    toggleModal();
  };

  const setModalImageURL = id => {
    return galleryItems.find(galleryItem => galleryItem.id === id);
  };

  const modalImageItem = setModalImageURL(modalImageId);

  return (
    <>
      <Searchbar>
        <SearchForm onSubmit={handleFormSubmit} />
      </Searchbar>

      {status === Status.IDLE && (
        <h2 style={{ textAlign: 'center' }}>
          Please enter your query in the search query
        </h2>
      )}

      {galleryItems && (
        <>
          <ImageGallery
            imageGalleryItems={galleryItems}
            onGalleryItemClick={handleGalleryItemClick}
          />
        </>
      )}

      {showModal && (
        <Modal
          imageURL={modalImageItem.largeImageURL}
          imageAlt={modalImageItem.tags}
          onClose={toggleModal}
        />
      )}

      {loadMore && status !== Status.PENDING && (
        <LoadMore onClick={incrementPage} />
      )}

      {status === Status.PENDING && <Loader />}

      <ToastContainer style={{ justifyContent: 'center' }} />
    </>
  );
}

export default ImageInfo;
