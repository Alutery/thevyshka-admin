import React from 'react';
import PostEditor from './post-editor';

const PostView = () => {
    return (
        <PostEditor editable={false}/>
    );
};

export default PostView;