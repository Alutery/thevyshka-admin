import React from 'react';

const AuthorsTable = () => {
    return (
        <table className="content__table authors__table">
            <thead>
            <tr>
                <th>Имя</th>
                <th>Описание</th>
                <th>Кол-во материалов</th>
                <th>Ссылка Вк</th>
                <th>Дата</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Дмитриев Владислав</td>
                <td>Миллиардер, филантроп, студент Вышки</td>
                <td>12</td>
                <td>vk.com/dvv2423</td>
                <td>21.07.2020</td>
            </tr>
            <tr>
                <td>Дмитриев Владислав</td>
                <td>Миллиардер, филантроп, студент Вышки</td>
                <td>12</td>
                <td>vk.com/dvv2423</td>
                <td>21.07.2020</td>
            </tr>
            </tbody>
        </table>
    );
};

export default AuthorsTable;