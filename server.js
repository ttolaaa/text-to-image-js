// import dotenv
import * as dotenv from 'dotenv';

// access env variable define in .env file
dotenv.config();

// initialize openai sdk
import { Configuration, OpenAIApi } from 'openai';

// create config object from Configuration with require api key
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

//initialize openai sdk
const openai = new OpenAIApi(configuration);

import express from 'express';
import cors from 'cors';

// create app object express()
const app = express();

// add middleware to application & enable CORS for all routes
app.use(cors());  // middleware adds CORS headers to responses
app.use(express.json()); //  middleware parses the JSON body of incoming requests.


app.post('/dream', async (req, res) => {
    const prompt = req.body.prompt;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const image = aiResponse.data.data[0].url;
    res.send({ image });
});

app.listen(8080, () => console.log('make art on http://localhost:8080/dream'));