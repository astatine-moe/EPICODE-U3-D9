import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Job from "./Job";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const CompanySearchResults = () => {
    const [jobs, setJobs] = useState([]);
    const params = useParams();
    const companies = useSelector((state) => state.companies);
    const dispatch = useDispatch();
    const baseEndpoint =
        "https://strive-benchmark.herokuapp.com/api/jobs?company=";

    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        try {
            const response = await fetch(baseEndpoint + params.companyName);
            if (response.ok) {
                const { data } = await response.json();
                setJobs(data);
            } else {
                alert("Error fetching results");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Link to={`/`}>Go back</Link>
            <br></br>
            <Button
                variant="primary"
                onClick={() => {
                    let favourited = companies.includes(params.companyName);
                    if (favourited) {
                        dispatch({
                            type: "REMOVE_FROM_FAVOURITES",
                            payload: params.companyName,
                        });
                    } else {
                        dispatch({
                            type: "ADD_TO_FAVOURITES",
                            payload: params.companyName,
                        });
                    }
                }}
            >
                {companies.includes(params.companyName)
                    ? "Unfavourite"
                    : "Favourite"}
            </Button>
            <Row>
                <Col>
                    {jobs.map((jobData) => (
                        <Job key={jobData._id} data={jobData} />
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default CompanySearchResults;
