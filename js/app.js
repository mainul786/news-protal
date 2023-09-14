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
    console.log(categories);
    const categoriesContainer = document.getElementById('categories');
    categories.forEach(category =>{
        console.log(category);
        const div = document.createElement('div');
        div.classList.add('col');
        div.style.fontSize = '14px';
        div.innerHTML = `
        <span>${category.category_name}</span>
        `;
        categoriesContainer.appendChild(div);
    })
}

loadCategories();