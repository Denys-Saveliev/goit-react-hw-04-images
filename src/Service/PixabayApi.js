const API_KEY = '26800121-c2642468342c571cae32618c0';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

function fetchImage(searchQuery, page) {
  return fetch(
    `${BASE_URL}?&key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}&page=${page}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(response.status);
  });
}

export { fetchImage, PER_PAGE };
