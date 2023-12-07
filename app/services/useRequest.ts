import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `http://localhost:3000/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.API_KEY}`
  //   }
});

// export function useGetPosts() {
//   return useQuery("get-posts", async () => {
//     const { getPostList } = await graphQLClient.request(gql`
//       query {
//         getPostList {
//           items {
//             _id
//             title
//             description
//             content
//           }
//         }
//       }
//     `);
//     return getPostList;
//   });
// }

export function useLogin(username: string, password: string) {
  return useQuery(["login", username, password], async () => {
    const res = await graphQLClient.request(
      gql`
        query {
          login(username: $username, password:$password) {
            username,accessToken
          }
        }
      `,
      { username, password }
    );
    return res;
  });
}
