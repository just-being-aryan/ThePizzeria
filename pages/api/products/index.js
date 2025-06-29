import dbConnect from "@/util/mongo";
import Product from "@/models/Product";

export default async function handler(req, res) {
  const { method, cookies } = req;

  // ✅ Safe token access (prevents undefined crash)
  const token = cookies?.token || "";

  // ✅ Await the DB connection
  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    // ✅ Token authentication check
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
