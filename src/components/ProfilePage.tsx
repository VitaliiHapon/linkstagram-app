import React from "react";
import ProfileInfo from "./ProfileInfoComponent";



class ProfilePage extends React.Component<any, any>{


    render() {

        return (
            <div>
                <ProfileInfo userName={this.props.match.params.userName} />

            </div>
        )
    }
}

export default ProfilePage;