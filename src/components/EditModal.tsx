import React from "react";
import { Link } from "react-router-dom";
import { profilesApi } from "../adapters/profiles";
import Modal from "../components/Modal";
import "../css/common.css";
import "../css/edit.css";
import { createUppy, uploadFiles } from "../utils/uppy";
import { imageUrlOrDefault } from "../utils/utils";

type EditModalProps = {
    onClose(): any;
    visible: any;
}

class EditModal extends React.Component<EditModalProps | any, any>{

    uppy = createUppy(1);

    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            job: '',
            description: '',
            imageUrl: ' ',
            files: [],
            shownImage: ''
        }

    }

    componentDidMount() {
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFilesChanged = this.onFilesChanged.bind(this);

        profilesApi.getAccount((x) => {
            this.setState({
                firstName: x.first_name,
                lastName: x.last_name,
                job: x.job_title,
                description: x.job_title,
                imageUrl: x.profile_photo_url,
                shownImage: imageUrlOrDefault(x.profile_photo_url)
            })
        })
    }

    handleSubmit(event: any) {

        let patch = (photo: any) => {
            profilesApi.editAccount({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                job_title: this.state.job,
                description: this.state.description,
                profile_photo: photo
            }, () => {
                this.props.onClose();
                window.location.reload();
            })

        }

        if (this.state.files.length != 0) {
            uploadFiles(this.uppy, this.state.files, (x) => {
                if (x.length != 0) {
                    patch(x[0].image);
                }
            });
        }
        else {
            patch(null);
        }
        event.preventDefault();
    }

    handleChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onFilesChanged(event: any) {
        let files: any[] = [];

        for (let file of event.currentTarget.files)
            files.push(file);

        if (files.length) {
            this.setState({
                shownImage: URL.createObjectURL(files[0])
            })
        }

        this.setState({
            files: files
        })
    }

    render() {
        return (
            <Modal onClose={this.props.onClose} width={576} height={672} visible={this.props.visible}>
                <form onSubmit={this.handleSubmit}>
                    <div className="edit-modal-container">
                        <div className="edit-modal-header">
                            <div className="edit-modal-tittle">Profile Information</div>
                            <Link to="/logout">
                                <button className="edit-modal-log-out-button ">Log Out</button>
                            </Link>
                        </div>
                        <div className="edit-modal-middle-container">
                            <div className="edit-modal-image-container">
                                <img className="edit-modal-image" src={this.state.shownImage} />

                                <input className="edit-modal-image-file-upload"
                                    id="file"
                                    type="file"
                                    multiple

                                    accept="image/*"
                                    name="Fd"
                                    onChange={this.onFilesChanged}
                                />

                            </div>
                            <div>
                                <div className="edit-modal-fname-container">
                                    <div className="edit-modal-label-text ">First Name</div>
                                    <div className="edit-modal-job-input">
                                        <input value={this.state.firstName} className="edit-modal-input edit-modal-input-40" name="firstName" onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <div className="edit-modal-lname-container">
                                    <div className="edit-modal-label-text">Last Name</div>
                                    <div className="edit-modal-job-input">
                                        <input value={this.state.lastName} className="edit-modal-input edit-modal-input-40" name="lastName" onChange={this.handleChange}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="edit-modal-job-desc-container">
                            <div className="edit-modal-label-text ">Job Title</div>
                            <div className="edit-modal-job-input">
                                <input value={this.state.job} className="edit-modal-input edit-modal-input-48" name="job" onChange={this.handleChange}></input>
                            </div>
                            <div className="edit-modal-label-text edit-modal-description-label">Description</div>
                            <div className="edit-modal-description-input">
                                <textarea value={this.state.description} className="edit-modal-input edit-modal-input-68" name="description" onChange={this.handleChange}></textarea >
                            </div>
                        </div>
                        <div className="edit-modal-buttons-container">
                            <button className="edit-modal-white-button" onClick={this.props.onClose}>Cancel</button>
                            <input type="submit" className="edit-modal-blue-button " value="Save"></input>
                        </div>

                    </div>
                </form>
            </Modal>

        )
    }
}

export default EditModal;