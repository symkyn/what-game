import React from 'react';
import Button from '../Button/Button';

const GroupDetail = ({name, deleteGroup}) => (
    <div>
        {name}
        <Button className='delete-group' onClick={deleteGroup}>X</Button>
    </div>
);

export default GroupDetail;