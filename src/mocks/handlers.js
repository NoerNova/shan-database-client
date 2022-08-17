import {rest} from "msw"

const users = {
  shan: {
    username: "shan",
    password: "MTIzNA==",
    response: {
      sid: "shan1234",
      admingroup: 0
    }
  },
  admin: {
    username: "admin",
    password: "MTIzNA==",
    response: {
      sid: "admin123456",
      admingroup: 1
    }
  }
}

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    const {username, password} = req.body

    if (username !== users[username].username && password !== users[username].password) {
      return res(
        ctx.status(403),
        ctx.json({
          error: {
            message: "Not Authorized"
          },
          authPassed: 0,
          admingroup: 0
        })
      )
    } 

    return res (
      ctx.status(200),
      ctx.json({
        status: 0,
        authPassed: 1,
        sid: users[username].response.sid,
        admingroup: users[username].response.admingroup
      })
    )
  }),

  rest.get('/verify_sid', (req, res, ctx) => {
    return res (
      ctx.status(200),
      ctx.text("this is string")
    )
  })
]
