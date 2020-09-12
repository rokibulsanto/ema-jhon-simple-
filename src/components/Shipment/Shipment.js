import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);
  const [userLoggedIn , setUserLoggedIn] = useContext(userContext);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={userLoggedIn.name} ref={register({ required: true })} placeholder="Your Name"/>
      {errors.name && <span className="error">name is required</span>}

      <input name="email" defaultValue={userLoggedIn.email} ref={register({ required: true })} placeholder="Your Email" />
      {errors.email && <span className="error">email is required</span>}

      <input name="address" ref={register({ required: true })} placeholder="Your Address" />
      {errors.address && <span className="error">address is required</span>}

      <input name="phone" ref={register({ required: true })}  placeholder="Your Phone"/>
      {errors.phone && <span className="error">phone is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;