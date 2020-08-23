import React, {useEffect, useState} from 'react';
import {object, array} from 'yup';
import {compose} from 'redux';

import {Formik} from 'formik';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Categories from './categories/categories';
import Collaborators from './collaborators/collaborators';
import ContentHeader from '../../base/content-header';
import DragAndDrop from './drag-and-drop';

import {withDataService} from '../../hoc';
import Tags from './tags/tags';

const PostEditor = ({dataService}) => {
    const [files, setFiles] = useState([]);

    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [collaborators, setCollaborators] = useState([]);

    useEffect(() => {
        dataService.getCategories()
            .then(data => data.map(category => ({...category, selected: false})))
            .then(data => setCategories(data));
    }, []);

    return (
        <>
            <ContentHeader title="Создание статьи"/>
            <div className="editor">
                <div className="editor__main">
                    <Formik
                        initialValues={{
                            files: [],
                        }}
                        onSubmit={(values) => {
                            console.log(values)
                            console.log(
                                JSON.stringify(
                                    {
                                        files: values.files.map(file => ({
                                            fileName: file.name,
                                            type: file.type,
                                            size: `${file.size} bytes`
                                        })),
                                    },
                                    null,
                                    2
                                )
                            );
                        }}
                        validationSchema={object().shape({
                            recaptcha: array(),
                        })}
                    >
                        {
                            ({values, handleSubmit, setFieldValue}) => (
                                <form className="editor__form" onSubmit={handleSubmit}>
                                    <DragAndDrop onChange={setFiles}/>
                                    <div className="editor__text">
                                        <label htmlFor="title">заголовок</label>
                                        <input type="text" id="title" name="title"/>

                                        <label htmlFor="post-description">описание</label>
                                        <textarea name="description" id="post-description"/>

                                        <label htmlFor="link">link name</label>
                                        <input className="editor-form__link" type="text" id="link" name="link"/>


                                        <CKEditor
                                            editor={ClassicEditor}
                                            data="<p>Hello from CKEditor 5!</p>"
                                            onInit={editor => {
                                                // You can store the "editor" and use when it is needed.
                                                // console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                console.log({event, editor, data});
                                            }}
                                            onBlur={(event, editor) => {
                                                console.log('Blur.', editor);
                                            }}
                                            onFocus={(event, editor) => {
                                                console.log('Focus.', editor);
                                            }}

                                        />
                                        <button type="submit" className="content__btn" style={{
                                            alignSelf: 'flex-end',
                                            marginTop: '15px',
                                        }}>Сохранить
                                        </button>
                                    </div>
                                </form>
                            )
                        }
                    </Formik>
                </div>
                <div className="editor__sidebar">
                    <Tags tags={tags} setTags={setTags}/>
                    <Categories categories={categories} setCategories={setCategories}/>
                    <Collaborators collaborators={collaborators} setCollaborators={setCollaborators}/>
                </div>
            </div>
        </>
    );
};

export default compose(withDataService())(PostEditor);

