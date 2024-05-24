document.addEventListener('DOMContentLoaded', () => {
    function fetchAllBreeds() {
        axios.get('https://dog.ceo/api/breeds/list/all')
            .then(response => {
                const breeds = response.data.message;
                const breedsList = document.getElementById('breedsList');
                breedsList.innerHTML = '<h2>All Breeds:</h2>';
                for (const breed in breeds) {
                    breedsList.innerHTML += `<p>${breed}</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching breed list:', error);
            });
    }

    fetchAllBreeds('list/all');

    // Function to fetch a random image of a breed
    function fetchRandomImage() {
        axios.get('https://dog.ceo/api/breeds/image/random')
            .then(response => {
                const randomImage = document.getElementById('randomImage');
                randomImage.innerHTML = '<h2>Random Image:</h2>';
                randomImage.innerHTML += `<img src="${response.data.message}" alt="Random Dog Image">`;
            })
            .catch(error => {
                console.error('Error fetching random image:', error);
            });
    }

    // Function to fetch all images of a specific breed
    function fetchBreedImages(breed) {
        if (!breed) {
            console.error('Breed is empty');
            return;
        }

        axios.get(`https://dog.ceo/api/breed/${breed}/images`)
            .then(response => {console.log(response.data)
                const breedImages = document.getElementById('breedImages');
                breedImages.innerHTML = `<h2>All Images of ${breedImages}:</h2>`;
                response.data.message.forEach(image => {
                    breedImages.innerHTML += `<img src="${image}" alt="${breed}">`;
                });
                
            })
            .catch(error => {
                console.error(`Error fetching images of breed ${breed}:`, error);
            });
    }

    // Function to search for a specific breed
    function searchBreed() {
        const breedInput = document.getElementById('breedInput');
        if (!breedInput || !breedInput.value) {
            console.error('Breed input is empty');
            return;
        }
        const breed = breedInput.value.trim().toLowerCase();
        fetchBreedImages(breed);
    }

    // Initial function calls
    fetchAllBreeds();
    fetchRandomImage();

    // Event listener for the search button
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchBreed);
});
