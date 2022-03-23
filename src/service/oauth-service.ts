import axios from "axios";
import { RequestHandler } from "express";

export const authGithub: RequestHandler = async (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (clientId == null || clientSecret == null) throw new Error('not coorect env vars')

  try {
    const axiosRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
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
