import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schemaGql.js";
import mongoose from "mongoose";
import { JWT_SECRET, MONGO_URI } from "./config.js";
import './models/User.js';
import './models/Quotes.js';
import jwt from 'jsonwebtoken';


mongoose.connect(MONGO_URI);

mongoose.connection.once("open", () => console.log("Connected to DB successfully"));

mongoose.connection.on("error", (err) => console.error("DB Connection Error: ", err));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const { authorization } = req.headers;
        if (authorization) {
            try {
            
                const { user_id } = jwt.verify(authorization, JWT_SECRET);
                return { user_id };
            } catch (err) {
                console.error("Invalid Token: ", err.message);
                throw new Error("Invalid or Expired Token");
            }
        }
        return {};
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});


server.listen().then(({ url }) => {
    console.log(`Server is running at ${url}`);
});
