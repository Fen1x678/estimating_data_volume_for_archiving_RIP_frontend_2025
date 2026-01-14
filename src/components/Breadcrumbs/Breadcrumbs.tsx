import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Algorithm} from "modules/types.ts";
import "./styles.css"

type Props = {
    selectedAlgorithm: T_Algorithm | null
}

const Breadcrumbs = ({selectedAlgorithm}:Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/algorithms") &&
                <BreadcrumbItem active>
                    <Link to="/algorithms">
						Алгоритмы
                    </Link>
                </BreadcrumbItem>
			}
            {selectedAlgorithm &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedAlgorithm.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs