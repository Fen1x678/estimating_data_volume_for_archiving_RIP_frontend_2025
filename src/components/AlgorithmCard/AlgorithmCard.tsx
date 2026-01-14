import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Algorithm} from "modules/types.ts";

interface AlgorithmCardProps {
    algorithm: T_Algorithm,
    isMock: boolean
}

const AlgorithmCard = ({algorithm, isMock}: AlgorithmCardProps) => {
    return (
        <Card key={algorithm.id} style={{width: '18rem', margin: "0 auto 50px" }}>
            <CardImg
                src={isMock ? mockImage as string : algorithm.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {algorithm.name}
                </CardTitle>
                <CardText>
                    Коэффициент сжатия: {algorithm.ratio} 
                </CardText>
                <Link to={`/algorithms/${algorithm.id}`}>
                    <Button color="primary">
                        Открыть
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default AlgorithmCard
