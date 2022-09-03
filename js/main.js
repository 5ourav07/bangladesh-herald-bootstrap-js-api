// all categories list 
const allCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(result => displayCategories(result.data.news_category))
        .catch((error) => console.log(error));
};

// display categories
const displayCategories = (categories) => {
    const newsCategories = document.getElementById('category-container');
    for (const category of categories) {
        const a = document.createElement('a');
        a.innerHTML = `
            <a onclick="newsDisplayLoad('${category.category_id}')" class='text-decoration-none text-dark' href="#">${category.category_name}</a>
        `;
        newsCategories.appendChild(a);
    }
};

const newsDisplayLoad = (category_id) => {
    // spinner
    const spinnerSection = document.getElementById('spinner');
    spinnerSection.classList.remove('d-none');

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(result => newsDisplay(result.data))
        .catch((error) => console.log(error));
};

const newsDisplay = (allNews) => {
    // news count 
    const newsCount = document.getElementById('news-count');
    newsCount.innerHTML = `
        <h2>Total ${allNews.length} news has found</h2>
    `;

    const newsCard = document.getElementById('all-news');
    const notFound = document.getElementById("not-found");
    newsCard.innerHTML = "";

    if (allNews.length === 0) {
        notFound.innerHTML = `
            <h2 class="text-center text-warning">No News found here !! search another </h2>
        `;
    }

    for (const news of allNews) {
        notFound.innerHTML = "";
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-sm-12 text-center col-md-5">
                        <img src="${news.thumbnail_url}" class="w-100 h-100" alt="...">
                    </div>
                    <div class="col-sm-12 col-md-7">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.slice(0, 120)}....</p>
                        </div>
                        <div class="author-img d-flex">
                            <img src="${news.author.img}" class="rounded-circle" alt="">
                            <div>
                                <p class="ms-3">
                                    ${news.author.name === null ? "No Author found" : news.author.name}
                                </p>
                                <p class="ms-3">
                                    ${news.author.published_date === null ? "No date" : news.author.published_date}
                                </p>
                            </div>
                        </div>
                        <p>Total view : ${news.total_view === null ? "No views " : news.total_view}</p>
                        <button id="show-details" onclick="showCategoryDetails('${news._id}')" type="button"
                            class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show
                            News Details
                        </button>
                    </div>
                </div>
            </div>
        `;
        newsCard.appendChild(div);
    }
    const spinnerSection = document.getElementById("spinner");
    spinnerSection.classList.add("d-none");
};

allCategories();