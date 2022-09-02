// const newsCount = document.getElementById('count');
// newsCount.style.display = 'none';

const allCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(result => displayCategories(result.data.news_category))
}

// let count = 0;

const displayCategories = categories => {
    const newsCategories = document.getElementById('category-container');
    for (const category of categories) {
        // count++;
        const a = document.createElement('a');
        a.innerHTML = `
            <a class="text-decoration-none text-dark" href="#">${category.category_name}</a>
        `;
        newsCategories.appendChild(a);
    }
}
allCategories();