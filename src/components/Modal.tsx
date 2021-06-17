import React from "react";
import '../css/common.css';
import '../css/modal.css';
import ErrorLabelComponent from "./ErrorLabelComponent";

type ModalProps = {
    width: number;
    height: number;
    hasCloseButton?: boolean;
    visible: any;
    onClose?: () => void;
}

class Modal extends React.Component<ModalProps, any> {

    close() {
        if(this.props.onClose) this.props.onClose();
    }

    renerCloseButton() {
        if (!this.props.hasCloseButton)
            return null;

        return (
            <div className="modal-close-button" onClick={() => this.close()}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4.08496" y="27.4027" width="33.0857" height="2" rx="1" transform="rotate(-45 4.08496 27.4027)" fill="#808080" />
                    <rect x="5.41418" y="4" width="33.1607" height="2" rx="1" transform="rotate(45 5.41418 4)" fill="#808080" />
                </svg>

            </div>
        )
    }

    render() {
        if (!this.props.visible)
            return null;
        return (
            <div>

                <div style={{ height: this.props.height, width: this.props.width }} className="modal-panel">
                    {this.props.children}
                {this.renerCloseButton()}</div>

                <div className="modal-background" onClick={() => this.close()} />

            </div>
        );
    }
}



export default Modal;