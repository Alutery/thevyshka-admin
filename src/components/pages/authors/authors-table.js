import React from 'react';

const AuthorsTable = ({loading, collaborators}) => {
    if (loading) {
        return <div>Loading...</div>;
    }

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
            {
                collaborators.map(collaborator => (
                    <tr key={collaborator.id}>
                        <td>{collaborator.name}</td>
                        <td>{collaborator.description}</td>
                        <td>{collaborator.posts.length}</td>
                        <td>{collaborator.links}</td>
                        <td>{collaborator.date}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
};

export default AuthorsTable;