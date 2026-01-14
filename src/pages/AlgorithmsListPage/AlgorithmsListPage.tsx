import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import AlgorithmCard from "components/AlgorithmCard/AlgorithmCard.tsx";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {RootState, useAppSelector} from "src/store/store.ts";
import {updateAlgorithmName} from "src/store/slices/algorithmsSlice.ts";
import {AlgorithmMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";
import "./styles.css"
import {isTauri} from "@tauri-apps/api/core";
import {T_Algorithm} from "modules/types.ts";

const AlgorithmsListPage = () => {

    const [algorithms, setAlgorithms] = useState<T_Algorithm[]>([])
    const [isMock, setIsMock] = useState(false);

    const dispatch = useDispatch()

    const {algorithm_name} = useAppSelector((state:RootState) => state.algorithms)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateAlgorithmName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setAlgorithms(AlgorithmMocks.filter(algorithm => algorithm.name.toLowerCase().includes(algorithm_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchAlgorithms()
    }

    const fetchAlgorithms = async () => {
        try {
            const env = await import.meta.env;
            const apiUrl = isTauri() ? env.VITE_API_URL : ""
            const response = await fetch(`${apiUrl}/api/algorithms/?algorithm_name=${algorithm_name.toLowerCase()}`)
            const data = await response.json()
            setAlgorithms(data)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const fetchCartData = async () => {
        try {
            const env = await import.meta.env;
            const apiUrl = isTauri() ? env.VITE_API_URL : ""
            await fetch(`${apiUrl}/api/compressions/cart/`)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        void fetchAlgorithms()
        void fetchCartData()
        return setAlgorithms([])
    }, []);


    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={algorithm_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {algorithms?.map(algorithm => (
                    <Col key={algorithm.id} sm="12" md="6" lg="4">
                        <AlgorithmCard algorithm={algorithm} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AlgorithmsListPage
