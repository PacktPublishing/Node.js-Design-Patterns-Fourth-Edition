import superagent from "superagent"; // v10.1.1

superagent
  .post("https://jsonplaceholder.typicode.com/posts")
  .send({ name: "John Doe", role: "user" })
  .set("accept", "json")
  .then((response) => {
    // deal with the response
    console.log(response.body);
  });
