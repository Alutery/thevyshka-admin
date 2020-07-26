import React from 'react';

const PostsTable = () => {
    return (
        <table className="content__table">
            <thead>
            <tr>
                <th>Заголовок</th>
                <th>Автор</th>
                <th>Рубрики</th>
                <th>Теги</th>
                <th>URL-путь</th>
                <th>Дата</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Прайс-листы и конверты: как устроена коррупция в российских вузах</td>
                <td>Текст: Имя Фамилия<br/>Иллюстрации: Имя Фамилия</td>
                <td>Люди, Мнения</td>
                <td>Коррупция, экзамен</td>
                <td>/corrupt-universities/</td>
                <td>21.07.2020</td>
            </tr>
            <tr>
                <td>Прайс-листы и конверты: как устроена коррупция в российских вузах</td>
                <td>Текст: Имя Фамилия<br/>Иллюстрации: Имя Фамилия</td>
                <td>Люди, Мнения</td>
                <td>Коррупция, экзамен</td>
                <td>/corrupt-universities/</td>
                <td>21.07.2020</td>
            </tr>
            </tbody>
        </table>
    );
};

export default PostsTable;