import { Button, Card, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Authentication System</h1>
          <p className="text-center mb-4">
            This is an Authentication system that stores JWT token in a
            HTTP-only cookie. This project also uses redux toolkit and react
            bootstrap library.
          </p>
          <div className="d-flex">
            <LinkContainer to="/profile">
              <Button variant="primary" className="me-3">
                Go To profile
              </Button>
            </LinkContainer>
            <LinkContainer to="/">
              <Button variant="secondary" className="">
                Log Out
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
