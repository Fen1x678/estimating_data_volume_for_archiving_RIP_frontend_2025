import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {T_Algorithm} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {AlgorithmMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";

type Props = {
    selectedAlgorithm: T_Algorithm | null,
    setSelectedAlgorithm: React.Dispatch<React.SetStateAction<T_Algorithm | null>>,
}

const AlgorithmPage = ({selectedAlgorithm, setSelectedAlgorithm}: Props) => {
    const [isMock, setIsMock] = useState(false);

    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/algorithms/${id}`)
            const data = await response.json()
            setSelectedAlgorithm(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedAlgorithm(AlgorithmMocks.find(algorithm => algorithm?.id == parseInt(id as string)) as T_Algorithm)
    }

    useEffect(() => {
        if (!isMock) {
            void fetchData()
        } else {
            createMock()
        }

        return () => setSelectedAlgorithm(null)
    }, []);

    if (!selectedAlgorithm) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={isMock ? mockImage as string : selectedAlgorithm.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedAlgorithm.name}</h1>
                    <p className="fs-5">Описание: {selectedAlgorithm.description}</p>
                    <p className="fs-5">Коэффициент сжатия: {selectedAlgorithm.ratio} </p>
                </Col>
            </Row>
        </Container>
    );
};

export default AlgorithmPage
