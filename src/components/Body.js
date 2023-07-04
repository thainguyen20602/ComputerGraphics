import ReactDatGui from "./misc/ReactDatGui";

import Process from "./Process";

export default function Body(props) {
    return (
        <>
            <div id="webgl" style={{ position: "absolute", width: "100%", height: "100%" }}>
                <Process data={props.data} imageUrl={props.imageUrl} geometry={props.geometry} surface={props.surface} light={props.light} animation={props.animation} />
                <ReactDatGui initialDatState={props.data} geometry={props.geometry} handleUpdate={props.handleUpdate} />
            </div>
        </>
    )
}