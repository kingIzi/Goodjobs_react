import React from 'react';
import { Spinner } from "@material-tailwind/react";

const LoadingIndicator = () => {
    return (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      );
};

export default LoadingIndicator;