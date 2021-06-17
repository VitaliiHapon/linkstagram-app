import React from "react";
import ClickAwayListener from "react-click-away-listener";
import '../css/nav-bar.css';




type DropDownSelectData = {
    options: string[];
    itemSelected: (item: string) => void;
    selectedItem: any;
    offset: number;
}
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

class DropDownSelect extends React.Component<DropDownSelectData, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            option: this.props.selectedItem,
            dropDownVisible: false
        }
    }


    render() {
        return (
            <ClickAwayListener onClickAway={() => this.setState({ dropDownVisible: false })}>
                <div className="common-dropdown-container">

                    <div className="common-dropdown-selected-item" onClick={() => {
                        this.setState({ dropDownVisible: !this.state.dropDownVisible }) 
                        }}>
                        {this.state.option.toUpperCase()}
                    </div>

                    {this.state.dropDownVisible == true ?
                        <div className="common-dropdown-list-box" style={{ marginTop: this.props.offset }}>
                            {this.props.options.filter(x => x != this.state.option).map((x) => (
                                <div onClick={() => {
                                    this.props.itemSelected(x);
                                    this.setState({ dropDownVisible: false, option: x })
                                }} className="common-dropdown-list-item">{x.toUpperCase()}</div>
                            )
                            )}
                        </div>
                        : null}

                </div>
            </ClickAwayListener>
        );
    }
}

export default DropDownSelect;
