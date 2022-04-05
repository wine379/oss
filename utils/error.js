import db from "./db"

const getError = (e) => e.response && e.response.data && e.response.data.message ? e.response.data.message : e.message

const onError = async (err, req, res, next) => {
  await db.disconnect()
  res.status(500).send({message: err.toString()})
} 

export { getError, onError };