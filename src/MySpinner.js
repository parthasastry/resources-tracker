import React from "react";
import { Spinner, Button } from "react-bootstrap";

const MySpinner = () => {
  const spinner = (
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button>
  );
  return <div className="text-center">{spinner}</div>;
};

export default MySpinner;
