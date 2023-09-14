const loadCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data)
    } 
    catch(error){
        console.log(error)
    }
}


loadCategories();