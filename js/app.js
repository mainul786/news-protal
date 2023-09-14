const loadCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        dispalyCategories(data.data.news_category)
    } 
    catch(error){
        console.log(error)
    }
}

const dispalyCategories = categories =>{
    // console.log(categories);
    const categoriesContainer = document.getElementById('categories');
    categories.forEach(category =>{
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

const categoriesData = async (categoriesId) =>{
    // console.log(categoriesId);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoriesId}`;
   try{
    const res = await fetch(url);
    const data = await res.json();
    displayNewsData(data.data);
    // console.log(data.data);
   }
   catch(error){
    console.log(error);
   }
}

const displayNewsData = async (newsData) =>{
console.log(newsData);
const newsHeading = document.getElementById('news-heading');
newsHeading.innerText=`${newsData.length}  items found for category `;
console.log(newsData.length)
newsData.forEach(news => {
    console.log(news); 
});
};

loadCategories();