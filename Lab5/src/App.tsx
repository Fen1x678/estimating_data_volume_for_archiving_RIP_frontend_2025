import {useState} from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import AlgorithmPage from "pages/AlgorithmPage";
import AlgorithmsListPage from "pages/AlgorithmsListPage";
import {Route, Routes} from "react-router-dom";
import {T_Algorithm} from "src/modules/types.ts";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import "./styles.css"

function App() {

    const [selectedAlgorithm, setSelectedAlgorithm] = useState<T_Algorithm | null>(null)

    return (
        <div>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedAlgorithm={selectedAlgorithm} />
                </Row>
                <Row>
                    <Routes>
						<Route path="/" element={<HomePage />} />
                        <Route path="/algorithms/" element={<AlgorithmsListPage />} />
                        <Route path="/algorithms/:id" element={<AlgorithmPage selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm} />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
