import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";


export function SignUp() {
  return (
    <section className="w-screen h-screen grid place-items-center">
      <div className="w-full lg:w-3/5">
      <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Not registered</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Complete the form below to add a new staff</Typography>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
