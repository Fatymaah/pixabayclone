const access_key = '17272430-edc0689efc84e3969dd6b26ef';
const searchParam = location.search.split('=').pop();
const f = document.getElementById('form');
const photos = `https://pixabay.com/api/?key=${access_key}&totalHits=30`;
const search = `https://pixabay.com/api/?key=${access_key}&q=${searchParam}&page=1`;

const gallery = document.querySelector('.gallery');

let currentImage = 0;
let allImages;

const getImages = () =>{
    fetch(photos)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        makeImages(allImages);
    });
}
const searchImages = () =>{
    fetch(search)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        makeImages(allImages);
        location.replace("search.html"+search)
    });
}

const makeImages = (data) => {
    data.hits.forEach((item, index ) => {
        let img = document.createElement('img');
        img.src = item.largeImageURL;
        img.className = 'gallery-img';

        gallery.appendChild(img);

        //show image
        img.addEventListener('click', () => {
            currentImage = index;
            showImage(item);
        })

    });
}

const showImage = (item) =>{
    window.open(item.pageURL, '_blank').focus();
}


if(searchParam == ''){
    getImages();
}else{
    searchImages();
}


