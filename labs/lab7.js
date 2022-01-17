window.addEventListener('load', () =>  {

    let swiper = new Swiper(".mySwiper", { // определяем класс, внутри свайпер
        effect: "coverflow",
        grabCursor: true, //перелистывание курсором
        centeredSlides: true,
        coverflowEffect: {
            rotate: 50, //угол поворота
            stretch: 0,
            depth: 100,
            modifier: 1,

        },

        slidesPerView: 3, // 3 изображения на ширину страници

        autoplay: { // задаем автоповорот
            delay: 3000,
            //  disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination", //шкала в низу, для нее определяем класс
            clickable: true, // переход по шкале
        },

        keyboard: {
            enabled: true, // разрешить прокрутку с клавиатуры
        },
        navigation: {
            nextEl: '.swiper-button-next', //передаем класс для кнопки вправо
            prevEl: '.swiper-button-prev', //передаем класс для кнопки влево
        },

        loop: true, //цикличная навигация
    });
});