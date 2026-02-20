import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Algorithm} from "src/modules/types.ts";
import AlgorithmCard from "components/AlgorithmCard";
import Cart from "components/Cart/Cart.tsx";
import {AlgorithmMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect, useState} from "react";
import "./styles.css"

const AlgorithmsListPage = () => {
    const [algorithms, setAlgorithms] = useState<T_Algorithm[]>([])
    const [algorithmName, setAlgorithmName] = useState<string>("")
    const [isMock, setIsMock] = useState(false);

    const fetchAlgorithmsData = async () => {
        try {
            const response = await fetch(`/api/algorithms/?algorithm_name=${algorithmName.toLowerCase()}`)
            const data = await response.json()
            setAlgorithms(data)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const fetchCartData = async () => {
        try {
            await fetch(`/api/compressions/cart/`)
        } catch {
            createMocks()
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setAlgorithms(AlgorithmMocks.filter(algorithm => algorithm.name.toLowerCase().includes(algorithmName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchAlgorithmsData()
        }
    }

    useEffect(() => {
        void fetchAlgorithmsData()
        void fetchCartData()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={algorithmName} onChange={(e) => setAlgorithmName(e.target.value)} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Cart />
                </Col>
            </Row>
            <Row>
                {algorithms?.map(algorithm => (
                    <Col key={algorithm.id} xs="4">
                        <AlgorithmCard algorithm={algorithm} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AlgorithmsListPage
