import classes from "./Plate.module.css";

const Plate = (props) => {
  return (
    <div className={classes.container}>
      <div>{props.title}</div>
      <img alt="Food" src={props.image}></img>
    </div>
  );
};

export default Plate;
