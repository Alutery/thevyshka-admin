import React from 'react';
import Spinner from '../../base/spinner';
import {Link} from 'react-router-dom';

const PostsTable = ({loading, posts, onDelete}) => {

    const handleDeleteClick = (postId) => {
        if (window.confirm('Вы уверены, что хотите удалить?')) {
            onDelete(postId);
        }
    }

    return (
        <>
            <table className="content__table posts_table">
                <thead>
                <tr>
                    <th>Заголовок</th>
                    <th>Автор</th>
                    <th>Рубрики</th>
                    <th>Теги</th>
                    <th>URL-путь</th>
                    <th>Дата</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody style={{whiteSpace: 'pre-wrap'}}>
                {
                    !loading && posts.map(post => {
                        return (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.collaborators.map(collaborator => `${collaborator.role}: ${collaborator.name}`).join('\n')}</td>
                                <td>{post.categories.map(category => category.name).join(', ')}</td>
                                <td>{post.tags.map(tag => tag.name).join(', ')}</td>
                                <td>/{post.linkName}/</td>
                                <td>{post.modifiedDate}</td>
                                <td>
                                    <div className="content-table__actions">
                                        <Link to={`/post/${post.id}`} className="content__btn">Перейти</Link>
                                        <Link to={`/editor/${post.id}`} className="content__btn">Изменить</Link>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteClick(post.id)}>
                                            Удалить
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            {loading && <Spinner/>}
        </>
    );
};

export default PostsTable;