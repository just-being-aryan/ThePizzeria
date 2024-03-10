import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard"

// PizzaList.jsx
const PizzaList = ({pizzaList}) => {
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
      Embark on a culinary journey like no other as we proudly present the finest selection of French pizzas that will tantalize your taste buds and transport you to the streets of Paris. Our chefs have meticulously crafted each masterpiece, infusing flavors that pay homage to the rich gastronomic heritage of France.
      </p>

      <div className= {styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key = {pizza._id} pizza = {pizza}/>
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
