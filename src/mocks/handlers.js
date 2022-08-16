import {rest} from "msw"

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    const {username, password} = req.body

    if (username !== "shan" && password !== "MTIzNA==") {
      return res(
        ctx.status(403),
        ctx.json({
          error: {
            message: "Not Authorized"
          },
          authPassed: 0
        })
      )
    }

    return res (
      ctx.status(200),
      ctx.json({
        sid: "666asdf",
        adminGroup: 1,
        status: 0
      })
    )
  }),
]
