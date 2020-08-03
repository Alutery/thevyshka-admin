import React from 'react';
import Spinner from '../../base/spinner';

const AuthorsTable = ({loading, collaborators}) => {
    return (
        <>
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
                {
                    !loading && collaborators.map(collaborator => (
                        <tr key={collaborator.id}>
                            <td>{collaborator.name}</td>
                            <td>{collaborator.description}</td>
                            <td>{collaborator.posts.length}</td>
                            <td><a href={collaborator.links}>
                                {collaborator.links}
                            </a></td>
                            <td>{collaborator.date}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {loading && <Spinner/>}
        </>
    );
};

export default AuthorsTable;