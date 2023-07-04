import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from "./Body";
import Header from "./Header";


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        const initialDatState = {
            string: "Camera",
            far: 1000,
            fov: 75,
            near: 1,
            colorObject: "#ff0000",
            colorLight: "0xffffff",
            lightPosition: 2,
            objectTransform: "translate",
        };
        this.state = {
            geometry: "box",
            surface: "default",
            light: "remove",
            animation: "none",
            data: initialDatState,
            imageUrl: "None"
        };

        this.ref = React.createRef();
    }

    handleUpdate = newData =>
        this.setState(prevState => ({
            data: { ...prevState.data, ...newData }
        }));

    handleClick = async (type, value) => {
        if (type === "Geometry") {
            this.setState({ geometry: value })
        }
        else if (type === "Surface")
            this.setState({ surface: value })
        else if (type === "Light")
            this.setState({ light: value })
        else if (type === "Animation")
            this.setState({ animation: value })

    }
    handelSetFile = (imageUrl) => {
        this.setState({ imageUrl: imageUrl })
    }

    render() {
        return (
            <>
                <Header handelClick={this.handleClick} geometry={this.state.geometry} surface={this.state.surface} light={this.state.light} animation={this.state.animation} handelSetFile={this.handelSetFile} />
                <Body geometry={this.state.geometry} imageUrl= {this.state.imageUrl} surface={this.state.surface} light={this.state.light} animation={this.state.animation} data={this.state.data} handleUpdate={this.handleUpdate} />
            </>
        );
    }
}
