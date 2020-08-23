import React, {useMemo, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: '360px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#C2D0D8',
    borderColor: '#CBD6DC',
    borderWidth: '1px',
    borderStyle: 'solid',
    boxSizing: 'border-box',
    boxShadow: '0 0 4px rgba(0, 117, 180, 0.42)',
    marginBottom: '7px',
};

const buttonStyle = {
    textDecoration: 'none',
    border: 'none',
    padding: '9px 8px',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    lineHeight: '14px',
    outline: 'none',
    background: 'linear-gradient(221.77deg, #7D2995 15.92%, #2395BD 97.92%)',
    cursor: 'pointer',
};

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
    maxWidth: '80%',
    maxHeight: '90%',
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
    width: 'auto',
    maxWidth: '100%',
    height: '100%',
    cursor: 'pointer',
};

const DragAndDrop = ({onChange}) => {
    const [files, setFiles] = useState([]);

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
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            onChange(acceptedFiles);
        },
    });

    const style = useMemo(() => ({
        ...baseStyle,
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
        <div className="container">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                {
                    files.length ?
                        thumbs
                        : <button type="button" style={buttonStyle} onClick={open}>Загрузить фото</button>
                }
            </div>
        </div>
    );
};

export default DragAndDrop;
