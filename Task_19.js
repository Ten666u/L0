//https://oauth.vk.com/authorize?client_id=51742158&display=page&redirect_uri=https://ten666u.github.io/Task_19&scope=wall&response_type=token&v=5.131&state=123456

const token = window.location.hash.split("=")[1].split("&")[0];

const postsContainer = document.getElementById("posts_container");

let posts = [];
const count = 10;
let offset = 0;

function loadPosts() {
    //! объявляем функцию загрузки постов

    const loadImg = (obj) => {
        if (obj.attachments[0]?.type  == "photo") {
            return `<img class="post_img" src=${obj.attachments[0]["photo"].sizes[4].url}></img>`;
        }
        if (obj.attachments[0]?.type == "video") {
            return `<img class="post_img" src=${obj.attachments[0]["video"]["image"][3].url}></img>`;
        }
        return `<div></div>`;
    };

    VK.Api.call(
        "wall.get",
        {
            //! запрос использует ключевые слова VK.Api.call для вызова метода получения постов первый аргумент это метод вызова второй параметры
            owner_id: -29534144,
            domain: "lentach",
            count: count,
            offset: offset,
            access_token: token,
            v: 5.131,
        },
        (r) => {
            //! обрабатываем ответ от апи
            if (r.response) {
                //! проверка пришло ли нам что либо
                const newPosts = r.response.items; //! задаём как массив объектов пришедший с апи
                const html = newPosts //! создаём новый массив при помощи метода map который вернёт нам вёрстку новых элементов для дальнейших действий
                    .map(
                        (post) => `
                  <div class="post">
                    <div class="post_date">${new Date(
                        post.date * 1000
                    ).toLocaleDateString()}</div>
                    <div class="post_txt">${post.text}</div>
                    ${loadImg(post)}
                  </div>
                `
                    )
                    .join(""); //! соединяем верстку

                postsContainer.insertAdjacentHTML("beforeend", html); //! добавляем посты в список

                posts = posts.concat(newPosts); //! добавляем посты в массив для кэширования
                offset += count; //! увеличиваем смещение
                console.log(r.response.items)
            }
        }
    );
}

const checkPosition = () => {
    //Нам потребуется знать высоту документа и высоту экрана:
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;

    // Они могут отличаться: если на странице много контента,
    // высота документа будет больше высоты экрана (отсюда и скролл).

    // Записываем, сколько пикселей пользователь уже проскроллил:
    const scrolled = window.scrollY;

    // Обозначим порог, по приближении к которому
    // будем вызывать какое-то действие.
    // В нашем случае — четверть экрана до конца страницы:
    const threshold = height - screenHeight / 4;

    // Отслеживаем, где находится низ экрана относительно страницы:
    const position = scrolled + screenHeight;

    if (position >= threshold) {
        loadPosts();
    }
};

function throttle(callee, timeout) {
    let timer = null;

    return function perform(...args) {
        if (timer) return;

        timer = setTimeout(() => {
            callee(...args);

            clearTimeout(timer);
            timer = null;
        }, timeout);
    };
}

window.addEventListener('scroll', throttle(checkPosition, 300))
window.addEventListener('resize', throttle(checkPosition, 300))

loadPosts();
