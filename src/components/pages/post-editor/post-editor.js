import React, {useEffect, useState} from 'react';
import {object, array, string} from 'yup';
import {compose} from 'redux';
import {Formik} from 'formik';
import {useParams, useHistory} from 'react-router-dom';

import Categories from './categories/categories';
import Collaborators from './collaborators/collaborators';
import ContentHeader from '../../base/content-header';
import DragAndDrop from './drag-and-drop';
import Tags from './tags/tags';
import FormButton from '../../form-button/form-button';
import Editor from './ckeditor';

import {withDataService} from '../../hoc';
import Toast from '../../../utils/toast';


const PostEditor = ({dataService, editable = true}) => {
    const {postId} = useParams();

    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        linkName: '',
        status: '',
    });

    const [files, setFiles] = useState([]);
    const [content, setContent] = useState('');

    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [collaborators, setCollaborators] = useState([]);

    useEffect(() => {
        if (postId) {
            dataService
                .getPostById(postId)
                .then(post => {
                    setCollaborators(post.collaborators.map(item => ({
                        id: item.id,
                        name: item.name,
                        role: item.role,
                        photo: item.photo,
                    })));
                    setCategories(categories => categories.map(category => (
                        post.categories.some(item => item.id === category.id)
                            ? {...category, selected: true}
                            : {...category, selected: false}
                    )));
                    setTags(post.tags);
                    setContent(post.content);
                    post.image && setFiles([{name: post.image, preview: post.image}]);
                    setInitialValues({
                        title: post.title || '',
                        description: post.description || '',
                        linkName: post.linkName || '',
                        status: post.status || '',
                    });
                });
        }
    }, [postId, dataService])


    useEffect(() => {
        dataService.getCategories()
            .then(data => data.map(category => ({...category, selected: false})))
            .then(data => setCategories(data));
    }, [dataService]);

    return (
        <>
            <ContentHeader
                title={
                    editable
                        ? (postId ? "Редактирование статьи" : "Создание статьи")
                        : "Просмотр статьи"
                }
            />
            <div className="editor">
                <div className="editor__main">
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        onSubmit={async (values) => {

                            if (files) {
                                if (files[0] instanceof File) {
                                    let photo = await dataService.addPhoto(files[0]);
                                    values.image = process.env.REACT_APP_URL + photo;
                                } else {
                                    values.image = files[0].name;
                                }
                            }

                            values.tags = [...new Set(tags.map(tag => tag.name))];

                            values.categories = categories
                                .filter(category => category.selected)
                                .map(category => category.name);

                            values.collaborators = collaborators.map(collaborator => ({
                                id: collaborator.id,
                                role: collaborator.role || '',
                            }));

                            values.content = content;

                            if (!postId) {
                                dataService
                                    .createPost(values)
                                    .then(() => Toast.customSuccess('Статья создана'))
                                    .then(() => {
                                        window.location.href = '/posts';
                                    })
                                    .catch(() => Toast.customLoadFailed('Произошла ошибка при создании статьи'));
                            } else {
                                dataService
                                    .editPost({
                                        id: +postId,
                                        ...values,
                                    })
                                    .then(() => Toast.customSuccess('Статья изменена'))
                                    .then(() => {
                                        window.location.href = '/posts';
                                    })
                                    .catch(() => Toast.customLoadFailed('Произошла ошибка при редактировании статьи'));
                            }
                        }}
                        validationSchema={object().shape({
                            recaptcha: array(),
                            title: string(),
                            'post-description': string(),
                            link: string(),
                        })}
                    >
                        {
                            ({
                                 values,
                                 handleSubmit,
                                 handleChange,
                                 isSubmitting,
                                 setFieldValue,
                             }) => (
                                <form
                                    className="editor__form"
                                    onSubmit={handleSubmit}
                                    autoComplete="off"
                                >
                                    <DragAndDrop onChange={setFiles} disabled={!editable} files={files}/>
                                    <div className="editor__text">
                                        <label htmlFor="title">заголовок</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                            required
                                            disabled={!editable}
                                        />

                                        <label htmlFor="description">описание</label>
                                        <textarea
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            disabled={!editable}
                                        />

                                        <label htmlFor="link">link name</label>
                                        <input
                                            className="editor-form__link"
                                            type="text"
                                            name="linkName"
                                            value={values.linkName}
                                            onChange={handleChange}
                                            required
                                            disabled={!editable}
                                        />

                                        <Editor content={content} onChange={setContent}/>

                                        <div className="editor__buttons" style={{
                                            display: editable ? 'flex' : 'none'
                                        }}>
                                            <FormButton
                                                disabled={isSubmitting}
                                                text={'Опубликовать'}
                                                className="light"
                                                onClick={(event) => {
                                                    setFieldValue('status', 'published')
                                                }}
                                            />
                                            <FormButton
                                                disabled={isSubmitting}
                                                text={'Сохранить как черновик'}
                                                className="dark"
                                                onClick={(event) => {
                                                    setFieldValue('status', 'draft')
                                                }}
                                            />
                                        </div>
                                    </div>
                                </form>
                            )
                        }
                    </Formik>
                </div>
                <div className="editor__sidebar">
                    <Tags tags={tags} setTags={setTags} disabled={!editable}/>
                    <Categories categories={categories} setCategories={setCategories} disabled={!editable}/>
                    <Collaborators collaborators={collaborators} setCollaborators={setCollaborators}
                                   disabled={!editable}/>
                </div>
            </div>
        </>
    );
};

export default compose(withDataService())(PostEditor);

