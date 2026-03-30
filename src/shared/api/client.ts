import ky from "ky";

export const api = ky.create({
  prefixUrl: "https://jsonplaceholder.typicode.com",
  hooks: {
    // Auth and other interceptors can be added here later
    beforeRequest: [],
    afterResponse: [],
  },
});

