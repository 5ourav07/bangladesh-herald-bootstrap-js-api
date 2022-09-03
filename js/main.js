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
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none');

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
        <p class='fw-bold py-2 ms-2'>Total ${allNews.length} news has found</p>
    `;

    const newsCard = document.getElementById('all-news');
    const notFound = document.getElementById("not-found");
    newsCard.innerHTML = "";

    if (allNews.length === 0) {
        notFound.innerHTML = `
            <p class="text-center py-2 ms-2">No News found</p>
        `;
    }

    //sorting news by view
    let sort = allNews.sort((num1, num2) => {
        const value1 = num1.total_view;
        const value2 = num2.total_view;
        return (value1 < value2) ? 1 : -1;
    });

    for (const news of sort) {
        notFound.innerHTML = "";
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="row mb-2">
                <div class="col-lg-3 mb-5">
                    <img style="height: 220px;" src="${news.thumbnail_url}" alt="" class="img-fluid w-100 rounded">
                </div>
                <div class="col-lg-9">
                    <h5>${news.title}</h5>
                    <p class="details">${news.details.slice(0, 200)}....</p>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex">
                                <img src="${news.author.img}" alt="" class="author-img">
                                <h6 class="ms-2 mt-5 author">${news.author.name} <br> ${news.author.published_date} </h6>
                            </div>
                        </div>
                        <div class="col-lg-3 mt-5">
                            <h5><i class="fa-sharp fa-solid fa-eye"></i> ${news.total_view}</h5>
                        </div>
                        <div class="col-lg-3 mt-5">
                            <i class="fa-regular fa-star"> ${news.rating.number}</i>
                        </div>
                        <div class="col-lg-2 mt-5">
                            <i class="fa-solid fa-arrow-right btn btn-outline-info" id="show-details" onclick="showCategoryDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                        <div>
                    </div>
                </div>
            </div>
        `;
        newsCard.appendChild(div);
    }
    const spinner = document.getElementById("spinner");
    spinner.classList.add("d-none");
};

const showCategoryDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => categoryDetails(data.data[0]))
        .catch((error) => console.log(error));
};

// modal
const categoryDetails = (details) => {
    const modalTitle = document.getElementById("exampleModalLabel");
    modalTitle.innerText = details.title;
    const modalImage = document.getElementById("modal-image");
    modalImage.innerHTML = `
        <img src="${details.thumbnail_url}" alt="">
    `;
    const modalDetails = document.getElementById("modal-details");
    modalDetails.innerText = details.details.slice(0, 200) + "...";

    const modalAuthor = document.getElementById("modal-author");

    if (details.author.name === null) {
        modalAuthor.innerText = "No author";
    }
    else {
        modalAuthor.innerText = "Author:" + " " + details.author.name;
    }

    const modalViews = document.getElementById("modal-views");

    if (details.total_view === null) {
        modalViews.innerText = "No views";
    }
    else {
        modalViews.innerText = "Total View:" + " " + details.total_view;
    }

    const modalRating = document.getElementById('modal-rating');

    if (details.rating.number === null) {
        modalRating.innerText = "No rating";
    }
    else {
        modalRating.innerText = "Rating:" + " " + details.rating.number;
    }

    if (details.author.published_date === null) {
        document.getElementById("date").innerText = "No date found";
    }
    else {
        document.getElementById("date").innerText = details.author.published_date;
    }
};

allCategories();