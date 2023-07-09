import React, { Component } from "react";
import DatGui, {
  DatColor,
  DatNumber,
  DatSelect,
  DatString
} from "@tim-soft/react-dat-gui";

class DatGUI extends Component {
  constructor(props) {
    super(props);

    const initialDatState = {
      string: "Camera",
      far: 1000,
      fov: 75,
      near: 1,
      colorObject: "#2FA1D6",
      colorLight: "0xffffff",
      lightPosition: 2,
      objectTransform: "move"
    };

    this.state = {
      data: this.props.initialDatState,
      defaultData: initialDatState
    };
  }

  render() {

    return (
      <main className="react-dat-gui-demo">
        {/* <Stats data={data} /> */}
        <DatGui
          data={this.props.initialDatState}
          onUpdate={this.props.handleUpdate}
          className="react-dat-gui-relative-position"
        >
          <DatString path="string" label="Name Dat" />
          <DatNumber
            path="far"
            label="Far"
            min={0}
            max={20}
            step={1}
          />
          <DatNumber
            path="fov"
            label="Fov"
            min={0}
            max={200}
            step={2}
          />
          {/* <DatNumber path="near" label="Near" /> */}
          <DatNumber
            path="near"
            label="Near"
            min={0}
            max={20}
            step={1}
          />
          <DatNumber
            path="lightPosition"
            label="Light Position"
            min={0}
            max={4}
            step={0.2}
          />
          <DatColor label="Color Object" path="colorObject" />
          <DatColor label="Color Light" path="colorLight" />
          <DatSelect
            label="Object Transform"
            path="objectTransform"
            options={["move", "rotate", "scale"]}
          />
        </DatGui>
      </main>
    );
  }
}

export default DatGUI;
