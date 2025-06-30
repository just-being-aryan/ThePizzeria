import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import { getBaseUrl } from "@/util/getBaseUrl";

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];


  const baseUrl = getBaseUrl(); // Client-side base URL

  // const handleDelete = async (id) => {
  //   console.log(id);
  //   try {
  //     const res = await axios.delete(
  //       "http://localhost:3000/api/products/" + id
  //     );
  //     setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/api/products/${id}`);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // const handleStatus = async (id) => {
  //   console.log("Updating status for order ID:", id); // Debugging line
  //   const item = orderList.filter((order) => order._id === id)[0];
  //   const currentStatus = item.status;
  //   console.log("Current status:", currentStatus); // Debugging line
  
  //   try {
  //     const res = await axios.put("http://localhost:3000/api/orders/" + id, {
  //       status: currentStatus + 1,
  //     });
  //     console.log("Updated order:", res.data); // Debugging line
  //     setOrderList([
  //       res.data,
  //       ...orderList.filter((order) => order._id !== id),
  //     ]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

    const handleStatus = async (id) => {
    const item = orderList.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(`${baseUrl}/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                  src={product.img}
                  width={50}
                  height={50}
                  style={{ objectFit: "cover" }}
                  alt="pizza"
                />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

// export const getServerSideProps = async (ctx) => {
//   const myCookie = ctx.req?.cookies || "";

//   if (myCookie.token !== process.env.TOKEN) {
//     return {
//       redirect: {
//         destination: "/admin/login",
//         permanent: false,
//       },
//     };
//   }

//   // const productRes = await axios.get("http://localhost:3000/api/products");
//    const protocol = req.headers.host.includes("localhost") ? "http" : "https";
//    const baseUrl = `${protocol}://${req.headers.host}`;

//   const productRes = await axios.get(`${baseUrl}/api/products`);
//   const orderRes = await axios.get(`${baseUrl}/api/orders`);

//   // const orderRes = await axios.get("http://localhost:3000/api/orders");

//   return {
//     props: {
//       orders: orderRes.data,
//       products: productRes.data,
//     },
//   };
// };


export const getServerSideProps = async ({ req }) => {
  const { token } = cookie.parse(req.headers.cookie || "");

  if (token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const protocol = req.headers.host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${req.headers.host}`;

  const productRes = await axios.get(`${baseUrl}/api/products`);
  const orderRes = await axios.get(`${baseUrl}/api/orders`);

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index