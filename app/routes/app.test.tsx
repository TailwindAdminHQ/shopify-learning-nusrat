import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { Layout } from '@shopify/polaris';
import { authenticate } from 'app/shopify.server';
import React from 'react'
export async function loader({ request }: LoaderFunctionArgs) {
    // const user = {
    //     name: "test",
    //     email: "xyz@email.com",
    // }
    const { admin } = await authenticate.admin(request);

const response = await admin.graphql(
  `#graphql
  query {
    products(first: 10, reverse: true) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }`,
);

const data = await response.json();

    return Response.json(data); //in video only json is used
}
// export async function action({ request }: ActionFunctionArgs) {
//     const formData = await request.formData();

//     return Response.json({
//         email: formData.get("email"),
//         name: formData.get("name")
//     });
// }
const Test = () => {
    const testData = useLoaderData();
    const user = useLoaderData<typeof loader>();
    console.log(testData)
    return (
        <Layout>
            <ui-title-bar title="Products">
                <button onClick={() => console.log("Secondary action")}>Secondary action</button>
                <button variant="primary" onClick={() => console.log("Primary action")}>
                    Primary action
                </button>
            </ui-title-bar>

            <Form method="post">
                <h1>Settings for {user.name}</h1>

                <input
                    name="name"
                    defaultValue={user.name}
                />
                <input name="email" defaultValue={user.email} />

                <button type="submit">Save</button>
            </Form>
        </Layout>

    )
}

export default Test;