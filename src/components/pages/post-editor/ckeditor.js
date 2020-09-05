import React from 'react';
// // import ClassicEditor from '../../../ckeditor5-build-classic/build/ckeditor';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import CKEditor from '@ckeditor/ckeditor5-react';
//
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
//
import './custom-editor.scss';
//
// const editorConfiguration = {
//     plugins: [ Essentials, Bold, Italic, Paragraph ],
//     toolbar: [ 'bold', 'italic' ]
// };
//
// const Editor = ({onChange}) => {
//     return (
//         <CKEditor
//             config={ editorConfiguration }
//             editor={ClassicEditor}
//             data="<p></p>"
//             onChange={(event, editor) => {
//                 onChange(editor.getData());
//             }}
//         />
//     );
// };
//
// export default Editor;


import CKEditor from "react-ckeditor-component";

const editorConfiguration = {
    // toolbarGroups: [
    //     {name: 'document', groups: ['mode', 'document', 'doctools']},
    //     {name: 'clipboard', groups: ['clipboard', 'undo']},
    //     {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
    //     {name: 'forms', groups: ['forms']},
    //     {name: 'basicstyles', groups: ['Font','FontSize','basicstyles', 'cleanup']},
    //     {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
    //     {name: 'links', groups: ['links']},
    //     {name: 'insert', groups: ['insert']},
    //     {name: 'styles', groups: ['styles']},
    //     {name: 'colors', groups: ['colors']},
    //     {name: 'tools', groups: ['tools']},
    //     {name: 'others', groups: ['others']},
    //     {name: 'about', groups: ['about']},
    //     '/',
    //     '/'
    // ],
    removeButtons: 'Find,Replace,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,HiddenField,Strike,Subscript,Superscript,CopyFormatting,Outdent,Indent,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,Table,Smiley,SpecialChar,PageBreak,Iframe,FontSize,Link,Font,TextColor,BGColor,About',

    // toolbar: [ [ 'Bold' ] ],
    // format_tags: 'p;h1;h2;h3;b;i;u;blockquote',
    // coreStyles_bold: {
    //     element: 'b',
    //     styles: {'font-weight': 'bold'}
    // },
    // coreStyles_italic: {
    //     element: 'i',
    //     styles: {'font-style': 'italic'}
    // },
    // coreStyles_underline: {
    //     element: 'u',
    //     styles: {'text-decoration-line': 'underline'}
    // },
    // format_h1: {
    //     element: 'h1',
    //     styles: {
    //         'font-size': '44px',
    //         'font-weight': '500',
    //         'line-height': '52px',
    //         'margin': '15px 0',
    //     }
    // },
    // format_h2: {
    //     element: 'h2',
    //     styles: {
    //         'font-size': '36px',
    //         'font-weight': '500',
    //         'line-height': '42px',
    //         'margin': '15px 0',
    //     }
    // },
    // format_h3: {
    //     element: 'h1',
    //     styles: {
    //         'font-size': '20px',
    //         'font-weight': 'normal',
    //         'line-height': '23px',
    //         'margin': '15px 0',
    //     }
    // },
    // format_p: {
    //     element: 'p',
    //     styles: {
    //         'font-size': '18px',
    //         'font-weight': 'normal',
    //         'line-height': '21px',
    //         'margin': '15px 0',
    //     }
    // },
    // extraPlugins: 'font,justify',
    extraPlugins: 'font,uploadimage,justify',
    image2_alignClasses: [ 'align-left', 'align-center', 'align-right' ],

    // extraPlugins: 'easyimage',

    // Configure your file manager integration. This example uses CKFinder 3 for PHP.
    filebrowserBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html',
    filebrowserImageBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
    filebrowserUploadUrl: '/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
    filebrowserImageUploadUrl: '/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',

    // Upload dropped or pasted images to the CKFinder connector (note that the response type is set to JSON).
    uploadUrl: '/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

    contentsCss: 'http://dvv2423.fvds.ru/uploads/style.css',
    font_names: 'Rammetto One;Roboto;'
}

const Editor = ({content, onChange}) => {

    const handleChange = (evt) => {
        console.log("onChange fired with event info: ", evt);
        const newContent = evt.editor.getData();
        onChange(newContent);
    };

    const onBlur = (evt) => {
        console.log("onBlur event called with event info: ", evt);
    };

    const afterPaste = (evt) => {
        console.log("afterPaste event called with event info: ", evt);
    }

    const onfileUploadRequest = (evt) => {
        const fileLoader = evt.data.fileLoader,
            xhr = fileLoader.xhr;
        const token = localStorage.token;
        const formData = new FormData();

        // return fetch(`${process.env.REACT_APP_API_URL}/photo`, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${token}`,
        //     },
        //     body: formData
        // }).then(resp => (!resp.ok)
        //     ? Promise.reject('Error: ' + resp.status)
        //     : resp.text()
        // );


        xhr.open( 'POST', `${process.env.REACT_APP_API_URL}/photo`, true );
        xhr.setRequestHeader( 'Authorization', `Bearer ${token}` );

        formData.append( 'uploadedFile', fileLoader.file, fileLoader.fileName );
        fileLoader.xhr.send( formData );

        // Prevented the default behavior.
        evt.stop();
    }

    const onFileUploadResponse = (evt) => {
        // Prevent the default response handler.
        evt.stop();

        // Get XHR and response.
        const data = evt.data,
            xhr = data.fileLoader.xhr,
            response = xhr.responseText.split( '|' );

        if ( response[ 1 ] ) {
            // An error occurred during upload.
            data.message = response[ 1 ];
            evt.cancel();
        } else {
            data.url = process.env.REACT_APP_URL + response[ 0 ];
        }
    };

    return (
        <CKEditor
            config={editorConfiguration}
            activeClass="p10"
            content={content}
            events={{
                "blur": onBlur,
                "afterPaste": afterPaste,
                "change": handleChange,
                "fileUploadRequest": onfileUploadRequest,
                "fileUploadResponse" : onFileUploadResponse,
            }}
        />
    )
}

export default Editor;