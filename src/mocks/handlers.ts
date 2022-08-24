import { setupWorker, rest } from "msw";

interface LoginBody {
  username: string;
  password: string;
}
interface LoginResponse {
  username: string;
  sid: string;
  admingroup: string;
}

interface users {
  [key: string]: {
    username: string;
    password: string;
    response: {
      username: string;
      sid: string;
      admingroup: number;
    };
  };
}

const users: users = {
  shan: {
    username: "shan",
    password: "MTIzNA==",
    response: {
      username: "shan",
      sid: "shan1234",
      admingroup: 0,
    },
  },
  admin: {
    username: "admin",
    password: "MTIzNA==",
    response: {
      username: "admin",
      sid: "admin123456",
      admingroup: 1,
    },
  },
};

export const handlers = [
  rest.post<LoginBody, LoginResponse>("/login", async (req, res, ctx) => {
    const { username, password } = await req.json();

    if (
      username !== users[username].username &&
      password !== users[username].password
    ) {
      return res(
        ctx.status(403),
        ctx.json({
          error: {
            message: "Not Authorized",
          },
          authPassed: 0,
          admingroup: 0,
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        status: 0,
        authPassed: 1,
        sid: users[username].response.sid,
        admingroup: users[username].response.admingroup,
      })
    );
  }),

  rest.get("/verify_sid", (req, res, ctx) => {
    return res(ctx.status(200), ctx.text("this is string"));
  }),
];
