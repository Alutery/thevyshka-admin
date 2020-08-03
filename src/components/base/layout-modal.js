import React from 'react';
import {connect} from 'react-redux';

const LayoutModal = ({children, open}) => {
    return (
        <div className="modal-wrapper"
             style={{'display': open ? 'flex' : 'none'}}>
            {children}
        </div>
    );
};

const mapStateToProps = ({modal: {open}}) => {
    return {open};
}

export default connect(mapStateToProps, null)(LayoutModal);