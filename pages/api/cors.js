import Cors from "cors";
import axios from "axios";

// Initializing cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw errors that occur in middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  // Make axios request with cors wrapper, send data as res
  const result = await axios.get(req.body.uri);
  res.send(result.data);
}

export default handler
