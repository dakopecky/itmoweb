function addPic(title, thumb, url) {
    const img = document.createElement('img');
    img.src = thumb;
    img.alt = url;

    document.querySelector('.main__gallery').appendChild(img);
}

function addPage(currentPage) {
    document.querySelector('.main__loader').style.display = "inline";
    document.querySelector('.main__more').style.visibility = "hidden";
    document.querySelector('.load_error').style.display = "none";

    fetch('https://jsonplaceholder.typicode.com/photos?_limit=8&_page=' + currentPage)
        .then(response => response.json())
        .then(data => {
                for (let item of data) {
                    addPic(item['title'], item['thumbnailUrl'], item['url'])
                }

                document.querySelector('.main__loader').style.display = "none";
                document.querySelector('.load_error').style.display = "none";
                document.querySelector('.main__more').style.visibility = "visible";
            }
        ).catch((error) => {
        console.log(error);
        document.querySelector('.main__loader').style.display = "none";
        document.querySelector('.main__more').style.visibility = "visible";
        document.querySelector('.load_error').style.display = "inline";
    });
}

let currentPage = 1;
addPage(currentPage);

document.querySelector('.main__more').addEventListener("click", function () {
    currentPage++;

    addPage(currentPage);
})
