export const corsConfig = {
  // Options
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  origin: ["http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
