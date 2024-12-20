export const typeDefs = `#graphql
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
  uid: String,
  name: String,
}

type Query {
  folders: [Folder],
  folder(folderId: String): Folder,
  note(noteId: String): Note,
}

type Mutation {
  addFolder(name: String!): Folder,
  addNote(content: String!, folderId: ID!): Note,
  updateNote(id: String!,content: String!): Note,
  register(uid: String!, name: String!): Author
}
`;
