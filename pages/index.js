
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>The Pizzeria</title>
        <meta name="description" content="A Pizza you would die for ! " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {<AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}


// export const getServerSideProps = async (ctx) => {
//   const myCookie = ctx.req?.cookies || "";``
//   let admin = true;

//   if (myCookie.token === process.env.TOKEN) {
//     admin = true;
//   }

//    const res = await axios.get("http://localhost:3000/api/products");



//   return {
//     props: {
//       pizzaList: res.data,
//       admin,
//     },
//   };
// };

import dbConnect from "@/util/mongo";
import Product from "@/models/Product";

export const getServerSideProps = async (ctx) => {
  const { req } = ctx;
  const myCookie = req.cookies || {};
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  await dbConnect(); // ensure DB is ready
  const products = await Product.find(); // get products directly

  return {
    props: {
      pizzaList: JSON.parse(JSON.stringify(products)), // avoid serialization errors
      admin,
    },
  };
};

