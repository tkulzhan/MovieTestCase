<h1>Movie TestCase</h1>
<h3>Тестовое задание - Junior FullStack Developer</h3>
<br>
<h1>Как установить</h1>
<h3>Скачать архив и разархивировать у себя на ПК</h3>
<img src="https://sites.northwestern.edu/researchcomputing/files/2021/05/github.png" />
<h3>Или склонировать репозиторий</h3>
<img src="https://www.howtogeek.com/wp-content/uploads/2019/12/Copy-repo-URL-to-clipboard.png?trim=1,1&bg-color=000&pad=1,1" />
<h3>Затем в желаемой локации прописать в консоль следующую команду</h3>
<h3 style="background-color: black; padding: 10px 10px">git clone [URL репозитория без скобок]</h3>
<br>
<h1>Настройка Базы Данных</h1>
<h3>В файле <i>".env"</i> хранятся uri на локальную базу данных MongoDB, и название базы данных, которые можно изменить по желанию</h3>
<br>
<h1>Как запустить</h1>
<h3>В предпочетаемой вами среде разроботки (WebStorm, VS Code и т.п) открыть папку с проектом и прописать:</h3>
<h3 style="background-color: black; padding: 10px 10px">npm i</h3>
<h3>И после установки всех зависимостей прописать:</h3>
<h3 style="background-color: black; padding: 10px 10px">npm start</h3>
<br>
<h1>Примечания к запуску</h1>
<h3>Чтобы запустить проект у вас должен быть установлен NodeJS и MongoDB</h3>
<h3>При разработке использовалась версия node 18.16.0</h3>
<h3>Чтобы узнать свою версию node нужно прописать:</h3>
<h3 style="background-color: black; padding: 10px 10px">node -v</h3>
<br>
<h1>Сущности</h1>
<div style="background-color: black; padding: 10px 10px">
<h3>
<pre>
user: {
    _id: ObjectID,
    username: String,
    email: String,
    password: String
}
</pre>
<pre>
movie: {
    _id: ObjectID,
    title: String,
    description: String,
    rating: Number
}
</pre>
<pre>
token: {
    _id: ObjectID,
    value: String,
    user: ObjectID
}
</pre>
</h3>
</div>
<br>
<h1>Бонусные задания</h1>
<h3>1. Сортировка по рейтингу осуществляется следующим добавлением параметра запроса <i>"sort"</i>, которое может имет значение: <i>"asc"</i>, <i>"desc"</i>, <i>1</i> или <i>-1</i>. Значения <i>"asc"</i> и <i>1</i> сортируют по возрастанию, <i>"desc"</i> и <i>-1</i> по убыванию.</h3>
<h3>Также добавлена возможность фильтрации фильмов по полю title</h3>
<div style="background-color: black; padding: 10px 10px">
<h3>GET: http://localhost:3000/movies?title=te&sort=1</h3>
<pre>
[
    {
        "_id": "648e128e21eb3b44d00a47d6",
        "title": "Interstellar",
        "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        "img": "https://example.com/interstellar.jpg",
        "rating": 8.6
    },
    {
        "_id": "6491e47b51e33d55b2a33775",
        "title": "Testcase",
        "description": "Testcase description, made for testing",
        "img": "https://example.com/inception.jpg",
        "rating": 8.7,
        "__v": 0
    }
]
</pre>
</div>
<h3>2. Авторизация имеет следующие эндпоинты:</h3>
<ul>
<li>POST: /auth/login</li>
<li>POST: /auth/register</li>
<li>POST: /auth/logout</li>
</ul>
<h3>При логине создается jwt токен, хранящий свое значение и его владельца, токен дейсвителен 2 часа, после этого пользователю нужно заново залогиниться, если хочет иметь возможность добавления/изменения/удаления фильмов, поскольку при попытке выполнения данных операций проверяется наличие валидного токена в cookies.</h3>
<h3>Для регистрации в теле запроса необходимо предоставить:</h3>
<ul>
<li>username: string</li>
<li>email: string</li>
<li>password: string</li>
</ul>
<h3>Для логина в теле запроса необходимо предоставить:</h3>
<ul>
<li>username: string <b>или</b> email: string</li>
<li>password: string</li>
</ul>
<h3>Лог аут удаляет токен из базы данных и из cookies, делая невозможным добавление/изменение/удаление фильмов.</h3>
<h3>3. Фильмы имеют поле <i>"img"</i>, которое содержит ссылку на фотографию. Данные ссылки могут быть использованы для отображения фотографий.</h3>
