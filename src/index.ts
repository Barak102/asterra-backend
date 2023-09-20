import express from "express";
const app = express();
import cors from "cors";
const port = 8000;
import usersRouter from "./routers/users";


app.use(express.json());
app.use(cors({ origin: '*' }));


app.use('/api/users', usersRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});