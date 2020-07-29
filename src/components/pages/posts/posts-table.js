import React from 'react';

const PostsTable = ({loading, posts}) => {
    if(loading) {
        return <div>Loading...</div>
    }

    return (
        <table className="content__table posts_table">
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
            <tbody style={{whiteSpace: 'pre-wrap'}}>
            {
                posts.map(post => {
                    return (
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{post.collaborators.map(collaborator => `${collaborator.role}: ${collaborator.name}`).join('\n')}</td>
                            <td>{post.categories.map(category => category.name).join(', ')}</td>
                            <td>{post.tags.map(tag => tag.name).join(', ')}</td>
                            <td>/{post.linkName}/</td>
                            <td>{post.modifiedDate}</td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    );
};

export default PostsTable;