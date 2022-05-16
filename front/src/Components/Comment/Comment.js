import React from 'react';

const Comment = (props) => {
    return (
        <div className='comment'>
            <p>{props.comment}</p>            
        </div>
    );
};

export default Comment;