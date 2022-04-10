import axios from "axios";
import { RequestHandler } from "express";
import { config } from "./config-service";

type GHResponse = { access_token: string; token_type: string; scope: string, error?: any }

export const authGithub: RequestHandler = async (req, res) => {
  try {
    const axiosRes = await axios.post<GHResponse>(
      "https://github.com/login/oauth/access_token",
      {
        configService: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        code: req.query.code
      },
      {
        headers: {
          Accept: "application/json"
        }
      }
    )

    if (axiosRes.data.error) throw Error(axiosRes.data.error)
    console.log(axiosRes.data)

    res.json(axiosRes.data)
  } catch (e) {
    console.log(e)
    res.status(401).send('problem')
  }
};
