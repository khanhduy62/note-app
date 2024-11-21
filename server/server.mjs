import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import fakeData from "./fakeData/index.js";

const app = express();
const httpServer = http.createServer(app);

const typeDefs = `#graphql
  type Folder {
    id: String,
    name: String,
    createdAt: String,
    author: Author,
    notes: [Note],
  }

  type Note {
    id: String,
    content: String,
    folderId: String,
  }
    
  type Author {
    id: String,
    name: String,
  }

  type Query {
    folders: [Folder],
    folder(folderId: String): Folder,
  }
`;
const resolvers = {
  Query: {
    folders: () => {
      return fakeData.folders;
    },
    folder: (parent, args) => {
      const { folderId } = args;
      return fakeData.folders.find((folder) => folder.id === folderId);
    },
  },
  Folder: {
    author: (parent) => {
      return fakeData.authors.find((author) => author.id === parent.authorId);
    },
    notes: (parent) => {
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
