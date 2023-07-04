import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../assets/Logo/logo192.png"

export default function Header({
    handelClick,
    geometry,
    surface,
    light,
    animation,
    handelSetFile
}) {
    const getFile = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.click();
        input.onchange = (env) => {
            const data = env.target.files[0]
            const render = new FileReader()

            render.onload = () => {
                const dataUrl = render.result;
                console.log(dataUrl)
                handelSetFile(dataUrl)
                handelClick("Surface", "image")

            }
            render.readAsDataURL(data);
        }
    }

    return (
        <Navbar collapseOnSelect expand="xl" bg="light" variant="light">
            <Navbar.Brand className="pl-1">
                <img src={Logo} alt="Logo" width={30} style={{ marginRight: 10 }} />
                Computer graphics
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto" style={{ width: "50%" }}>

                    <NavDropdown title="Geometry" id="collasible-nav-dropdown" className="ml-4">
                        <p style={{ borderBottom: '1px solid black', paddingLeft: '10px' }} >Select: {geometry}</p>
                        <NavDropdown.Item onClick={() => { handelClick("Geometry", "box") }}>box</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Geometry", "sphere") }}>sphere</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Geometry", "cone") }}>cone</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Geometry", "cylinder") }}>cylinder</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Geometry", "torus") }}>torus</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Geometry", "torusknot") }}>torusknot</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Geometry", "tube") }}>tube</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Geometry", "teapot") }}>teapot</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Geometry", "circleGeometry") }}>circleGeometry</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Geometry", "ringGeometry") }}>ringGeometry</NavDropdown.Item>
                        <NavDropdown.Item onClick={getFile} >
                            getImage
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Surface" id="collasible-nav-dropdown" className="ml-4">
                        <p style={{ borderBottom: '1px solid black', paddingLeft: '10px' }} >Select: {surface}</p>
                        <NavDropdown.Item onClick={() => { handelClick("Surface", "point") }}>point</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Surface", "line") }}>line</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Surface", "phong") }}>phong</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Surface", "lambert") }}>lambert</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Surface", "standard") }}>standard</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Surface", "brich") }}>brich</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Surface", "particle") }}>particle</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Surface", "cement") }}>cement</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Surface", "doraemon") }}>doraemon</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Surface", "default") }}>default</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Light" id="collasible-nav-dropdown" className="ml-4">
                        <p style={{ borderBottom: '1px solid black', paddingLeft: '10px' }} >Select: {light}</p>
                        <NavDropdown.Item onClick={() => { handelClick("Light", "point") }}>point</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Light", "ambient") }}>ambient</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Light", "spot") }}>spot</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Light", "directional") }}>directional</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Light", "remove") }}>remove</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Animation" id="collasible-nav-dropdown" className="ml-4">
                        <p style={{ borderBottom: '1px solid black', paddingLeft: '10px' }} >Select: {animation}</p>
                        <NavDropdown.Item onClick={() => { handelClick("Animation", "animation: Ox") }}>animation: Ox</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Animation", "animation: Oy") }}>animation: Oy</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Animation", "animation: Oz") }}>animation: Oz</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Animation", "animation: translation y") }}>animation: translation y</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Animation", "animation: translation x") }}>animation: translation x</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { handelClick("Animation", "remove") }}>remove</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    )
}