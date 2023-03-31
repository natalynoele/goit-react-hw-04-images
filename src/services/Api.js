function fetchImages(query, page) {
  const ENDPOINT = 'https://pixabay.com/api/';
  const API_KEY = '33300919-40929e674b87413f155229e92';
  const options = 'image_type=photo&orientation=horizontal';
  const perPage = 12;

  const result = fetch(
    `${ENDPOINT}/?q=${query}&page=${page}&key=${API_KEY}&${options}&per_page=${perPage}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Sorry, there are no images for the request ${query}`)
    );
  });

  return result;
}

export default fetchImages;
