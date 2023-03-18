
const cardContainer = document.getElementById('cards');
cardContainer.innerHTML = '';
const getData = () => {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => showToDisplay(data))
        .catch(err => { console.log(err) });
}

const showToDisplay = (data) => {
    data.forEach(element => {
        const { image, id, title, price } = element;
        const isBookmarked = isBookmarkedChecked(id);
        cardContainer.innerHTML += `
        <div class="card">
            <div class="bookmark-icon">
                <i onclick="
                ${isBookmarked ? `removeBookmark('${id}')`
                : `addBookmark('${id}','${title}', '${price}', '${image}')`}" 
                class="${isBookmarked ? "fa-solid fa-bookmark text-danger"
                : "fa-regular fa-bookmark"}"></i>
            </div>
            <div class="product-img-container">
                <img class="product-img" src="${image}" alt="" />
            </div>
        <h3>${title}</h3>
        <p>The Widget 3000 is the latest and greatest in widget</p>
            <div class="priceAndButtons">
                <h2 class="text-primary">$${price}</h2>
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
    });
}

const addBookmark = (id, name, price, image) => {
    const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));
    const currentMarkedItem = { id, name, price, image, bookmarked: true };
    let bookmark = [];
    if (previousBookmark) {
        const isThisItemMarked = previousBookmark.find((product) => product.id == id);
        if (isThisItemMarked) {
            alert("this product is all ready bookmarked");
            // return 0;
        } else {
            bookmark.push(...previousBookmark, currentMarkedItem);
            localStorage.setItem("bookmark", JSON.stringify(bookmark));
        }
    } else {
        bookmark.push(currentMarkedItem);
        localStorage.setItem("bookmark", JSON.stringify(bookmark));
    }
    isBookmarkedChecked(id);
}

const removeBookmark = (id) => {
    const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));
    if (previousBookmark) {
        const removeBookmark = previousBookmark.filter((product) => product.id !== id);
        localStorage.setItem("bookmark", JSON.stringify(removeBookmark));
    } else {

    }
    isBookmarkedChecked(id);
}

const isBookmarkedChecked = (id) => {
    const previousBookmark = JSON.parse(localStorage.getItem("bookmark"));
    const isExist = previousBookmark?.find((product) => product.id == id);
    if (isExist) {
        return true;
    } else {
        return false;
    }
}

getData();