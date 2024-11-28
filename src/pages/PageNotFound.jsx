// import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";


function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main>
      <div>
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <button onClick={moveBack} size="large">
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
