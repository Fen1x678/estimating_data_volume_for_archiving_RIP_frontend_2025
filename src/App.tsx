import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import AlgorithmPage from "pages/AlgorithmPage/AlgorithmPage.tsx";
import AlgorithmsListPage from "pages/AlgorithmsListPage/AlgorithmsListPage.tsx";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage/HomePage.tsx";
import {useState} from "react";
import {T_Algorithm} from "modules/types.ts";

function App() {

    const [selectedAlgorithm, setSelectedAlgorithm] = useState<T_Algorithm | null>(null)

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedAlgorithm={selectedAlgorithm}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/algorithms/" element={<AlgorithmsListPage />} />
                        <Route path="/algorithms/:id" element={<AlgorithmPage selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
