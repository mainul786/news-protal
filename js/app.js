const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        dispalyCategories(data.data.news_category)
    }
    catch (error) {
        console.log(error)
    }
}

const dispalyCategories = categories => {
    // console.log(categories);
    const categoriesContainer = document.getElementById('categories');
    categories.forEach(category => {
        // console.log(category);
        const div = document.createElement('div');
        div.classList.add('col');
        div.style.fontSize = '14px';
        div.innerHTML = `
        <span onclick="categoriesData('${category.category_id}')">${category.category_name}</span>
        `;
        categoriesContainer.appendChild(div);
    })
}

const categoriesData = async (categoriesId) => {
    // console.log(categoriesId);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoriesId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsData(data.data);
        // console.log(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

// Truncate a string 

const trancateText = (str, num) => {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...';
}

const displayNewsData = async (newsData) => {
    // console.log(newsData);
    const newsHeading = document.getElementById('news-heading');
    newsHeading.innerText = `${newsData.length}  items found for category `;
    // console.log(newsData.length);
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
    newsData.forEach(news => {
        // console.log(news);
        const div = document.createElement('div');
        div.classList.add('card');
        div.style.marginBottom = '20px';
        div.style.marginTop = '20px';
        // div.style.maxWidth = '800px';
        let str = news.details;
        div.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <p class="card-text">${str.length > 20 ? str.substring(0, 250) + '...' : str}</p>
            </div>
            <div class="container mt-4">
            <div class="row row-cols-4">
                <div class="col d-flex">
                    <div> 
                    <img src="${news.author.img}" class="rounded-circle w-50" alt="...">
                    </div>
                    <div> 
                        <p>${news.author.name ? news.author.name : 'no-name'}</p>
                    </div>

                </div>
                <div class="col">
                <i class="fa-regular fa-eye"></i>
                <span>${news.rating.number ? news.rating.number : 'no-view'}</span>
                </div>
                <div class="col">
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                </div>
                <div class="col">
                    
                    <button onclick="showModal('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showModal">
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
                </div>
            </div>
            </div>
          </div>
        </div>
      
    `;
        cardContainer.appendChild(div);

    });
};

const showModal = async(id) =>{
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayModal(data.data[0]);
    }
    catch(error){
        console.log(error);
    }
}

const displayModal = async (modalInfo) =>{
console.log(modalInfo);
const showModal = document.getElementById('showModalLabel');
showModal.innerText = modalInfo.title;
const modalBody = document.getElementById('modal-body');
modalBody.innerHTML = `
<p>Name: ${modalInfo.author ? modalInfo.author.name : 'no-name'}</p>
<p>Badget:  ${modalInfo.rating.badge}</p>
<p>Total View: ${modalInfo.total_view ? modalInfo.total_view : 'no-view'}</p>
`;

}

loadCategories();