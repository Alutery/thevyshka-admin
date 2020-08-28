import React, {useMemo, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#4E62AA'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

/* thumb style */
const thumb = {
    display: 'inline-flex',
    maxWidth: '100%',
    maxHeight: '100%',
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    justifyContent: 'center',
    minWidth: 0,
    overflow: 'hidden',
};

const img = {
    display: 'block',
    'width': '90px',
    'height': '90px',
    cursor: 'pointer',
    'verticalAlign': 'middle',
    'borderRadius': '50%',
};

const AvatarDropzone = ({onChange, files, disabled}) => {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        open,
    } = useDropzone({
        accept: 'image/*',
        noClick: true,
        noKeyboard: true,
        onDrop: acceptedFiles => {
            onChange(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
    });

    const style = useMemo(() => ({
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    onClick={open}
                    src={file.preview}
                    style={img}
                    alt="thumb"
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div className="author-form__right" {...getRootProps({style})}>
            <input className="author-form__upload" id="file-upload" {...getInputProps()} disabled={disabled}/>
            <label className="author-form__upload-label" htmlFor="file-upload" id="file-drag">
                <div className="upload__img-container">
                    {
                        files.length ?
                            thumbs
                            : <i className="i-upload-image" aria-hidden="true"/>
                    }
                </div>
                <span
                    style={{
                        'display': !disabled ? 'block' : 'none'
                    }}
                    className="upload__btn"
                    onClick={open}>
                    Загрузить фото
                </span>
            </label>
        </div>
    );
};

export default AvatarDropzone;
