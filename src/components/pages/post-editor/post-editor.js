import React, {Component} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../base/content-header';
import ContentSelect from '../../base/content-select';

import image from '../../../images/avatar.png';
import ContentButton from '../../base/content-button';

const PostEditor = () => {
    const selectOptions = [
        {key: 1, value: 'all', name: 'Все', default: true},
        {key: 2, value: 'draft', name: 'Черновик'},
        {key: 3, value: 'published', name: 'Опубликована'},
    ];

    return (
        <>
            <ContentHeader title="Создание статьи"/>
            <div className="editor">
                <div className="editor__main">
                    <div className="image-upload">
                        <ContentButton text="Загрузить фото" onClick={() => console.log('upload image')}/>
                    </div>
                    <form className="editor__form">
                        <label htmlFor="title">заголовок</label>
                        <input type="text" id="title" name="title"/>

                        <label htmlFor="description">описание</label>
                        <textarea name="description" id="description"/>

                        <label htmlFor="link">link name</label>
                        <input className="editor-form__link" type="text" id="link" name="link"/>


                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>Hello from CKEditor 5!</p>"
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
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
                    </form>
                </div>
                <div className="editor__sidebar">
                    <div className="sidebar__section">
                        <h3 className="sidebar__title">Теги</h3>
                        <div className="sidebar__bubbles">
                            <div className="sidebar__bubble bubble_round bubble-1">
                                <input type="checkbox"/>
                                <label htmlFor="">статья</label>
                            </div>
                            <div className="sidebar__bubble bubble_round bubble-2">
                                <input type="checkbox"/>
                                <label htmlFor="">разработка</label>
                            </div>
                            <div className="sidebar__bubble bubble_round bubble-3">
                                <input type="checkbox"/>
                                <label htmlFor="">тег</label>
                            </div>
                            <div className="sidebar__bubble bubble_round bubble-4">
                                <input type="checkbox"/>
                                <label htmlFor="">админка</label>
                            </div>
                        </div>
                        <input type="text" className="sidebar__input" placeholder="Название тега"/>
                    </div>

                    <div className="sidebar__section">
                        <h3 className="sidebar__title">Рубрики</h3>
                        <div className="sidebar__bubbles">
                            <div className="sidebar__bubble bubble_square bubble-1">
                                <input type="checkbox"/>
                                <label htmlFor="">Места</label>
                            </div>
                            <div className="sidebar__bubble bubble_square bubble-2">
                                <input type="checkbox"/>
                                <label htmlFor="">Мнения</label>
                            </div>
                        </div>
                        <ContentSelect options={selectOptions} current="all"/>
                    </div>

                    <div className="sidebar__section">
                        <h3 className="sidebar__title">Авторы</h3>
                        <div className="sidebar__list">
                            <div className="sidebar__list-item">
                                <img src={image} alt="avatar" className="list-item__img"/>
                                <div className="list-item__text">
                                    <span className="list-item__name">Имя фамилия</span>
                                    <span className="list-item__role">Роль</span>
                                </div>
                            </div>
                            <div className="sidebar__list-item list-item">
                                <img src={image} alt="avatar" className="list-item__img"/>
                                <div className="list-item__text">
                                    <span className="list-item__name">Имя фамилия</span>
                                    <span className="list-item__role">Роль</span>
                                </div>
                            </div>
                        </div>
                        <input type="text" className="sidebar__input" placeholder="Имя автора"/>
                    </div>
                </div>

            </div>
        </>
    );

}

export default PostEditor;

