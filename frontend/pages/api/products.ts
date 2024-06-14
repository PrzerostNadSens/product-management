import axios from "axios";

const BACKEND_URL =
  `${process.env.BACKEND_URL}/products` || "http://localhost:3000/api/products";

export default async function handler(req, res) {
  const { method, body, query } = req;

  try {
    let result;
    switch (method) {
      case "GET":
        if (query.id) {
          result = await axios.get(`${BACKEND_URL}/${query.id}`);
        } else {
          result = await axios.get(BACKEND_URL);
        }
        break;
      case "POST":
        result = await axios.post(BACKEND_URL, body);
        break;
      case "PUT":
        result = await axios.put(`${BACKEND_URL}/${query.id}`, body);
        break;
      case "DELETE":
        result = await axios.delete(`${BACKEND_URL}/${query.id}`);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
    res.status(result.status).json(result.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || "Internal server error");
  }
}
