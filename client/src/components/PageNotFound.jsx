import { Card, Container } from "react-bootstrap";

const PageNotFound = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Page Not Found</h1>
        </Card>
      </Container>
    </div>
  );
};

export default PageNotFound;
