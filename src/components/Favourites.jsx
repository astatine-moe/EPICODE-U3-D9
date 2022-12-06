import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Favourites = ({ data }) => {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.companies);
    return (
        <Container>
            <br></br>
            <ListGroup as="ul">
                {companies.map((company) => (
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{company}</div>
                        </div>
                        <Button
                            variant="danger"
                            onClick={() => {
                                dispatch({
                                    type: "REMOVE_FROM_FAVOURITES",
                                    payload: company,
                                });
                            }}
                        >
                            Unfavourite
                        </Button>
                    </ListGroup.Item>
                ))}

                {!companies.length && (
                    <Alert variant="danger">Nothing favourited</Alert>
                )}
            </ListGroup>
        </Container>
    );
};

export default Favourites;
