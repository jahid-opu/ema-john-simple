import React from 'react';
import { useContext} from 'react';
import {UserContext} from '../../App';
import { useForm } from 'react-hook-form';
import "./Shipment.css";
const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => {
    console.log(data);
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name" />
      {errors.name && <span className="error">Name is required</span>}
      <input name="email" defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email" />
      {errors.email && <span className="error">Email is required</span>}
      <input name="address" {...register("address", { required: true })} placeholder="Your Address" />
      {errors.address && <span className="error">address is required</span>}
      <input name="phone" {...register("phone", { required: true })} placeholder="Your Phone Number" />
      {errors.phone && <span className="error">Phone is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;