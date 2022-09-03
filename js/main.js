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

    //sorting news by view
    let sort = allNews.sort((a, b) => {
        const aView = a?.total_view;
        const bView = b?.total_view;
        return (aView < bView) ? 1 : -1;
    });

    for (const news of sort) {
        notFound.innerHTML = "";
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card mb-3">
                <div class="row g-3">
                    <div class="col-12 text-center col-md-5">
                        <img  style="width: 300px; height: 250px;" src="${news.thumbnail_url}" alt="...">
                    </div>
                    <div class="col-12 col-md-7">
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

const showCategoryDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => categoryDetails(data.data[0]))
        .catch((error) => console.log(error));
};

// Load category details with modal
const categoryDetails = (details) => {
    const title = document.getElementById("exampleModalLabel");
    title.innerText = details.title;
    const modal = document.getElementById("modal-img");
    modal.innerHTML = `
      <img src="${details.image_url}" alt="">
    `;
    const modalDetails = document.getElementById("modal-details");
    modalDetails.innerText = details.details.slice(0, 200) + "...";
    const modalAuthor = document.getElementById("modal-author");
    if (details.author.name === null) {
        modalAuthor.innerText = "No author";
    } else {
        modalAuthor.innerText = "Author:" + " " + details.author.name;
    }
    const modalViews = document.getElementById("modal-views");
    if (details.total_view === null) {
        modalViews.innerText = "No views";
    } else {
        modalViews.innerText = "Total View:" + " " + details.total_view;
    }
    if (details.author.published_date === null) {
        document.getElementById("date").innerText = "No date found";
    } else {
        document.getElementById("date").innerText = details.author.published_date;
    }
};

allCategories();