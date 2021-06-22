import React from "react";
import { profilesApi } from "../adapters/profiles";
import AvatarIcon from "./AvatarIcon";
import "../css/common.css"
import { Tooltip } from "antd";


type UserListComponentProps = {
    iconSize: number
}

class UserListComponent extends React.Component<UserListComponentProps, { users: profilesApi.ProfileInfo[] }>{
    constructor(props: any) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        profilesApi.getProfiles(x => {
            this.setState({
                users: x
            })
            console.log(x)
        });
    }

    render() {
        if (this.state.users.length == 0)
            return null;

        return (
            <div className="common-user-list-container">
                {this.state.users.map(x =>
     
                    <div className="common-user-list-icon">
                        
                        <AvatarIcon link={"/profile/" + x.username}
                            key={x.username}
                            imageUrl={x.profile_photo_url}
                            size={this.props.iconSize} active={true}/>
                    </div>
                )}
            </div>
        )
    }
}

export default UserListComponent;