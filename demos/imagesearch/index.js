const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const showMoreBtn = document.getElementById('show-more-btn');

const apiKey = '-p7WmR74hSoF6eqQXAdU3x3Bo9a_gMWKc8hM6e0czcY';

let page = 1;
let query = '';

async function searchImages() {

  query = searchInput.value;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${apiKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    resultsContainer.innerHTML = '';
  }

  const results = data.results;
 
  // In the searchImages function, modify the imageLink creation part:
    results.map((result) => {
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        // Use the full resolution image URL for download
        imageLink.href = result.urls.full;
        imageLink.target = '_blank';
        // Set the download attribute with a custom filename
        imageLink.download = `unsplash-${result.id}.jpg`;
        
        imageLink.appendChild(image);
        resultsContainer.appendChild(imageLink);
    });
  
  showMoreBtn.style.display = 'block';
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener('click', () => {
  page++;
  searchImages();
});