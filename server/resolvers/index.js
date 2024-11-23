import fakeData from "../fakeData/index.js";
import { FolderModel } from "../models/index.js";

export const resolvers = {
  Query: {
    folders: async () => {
      const folders = await FolderModel.find().sort({
        updatedAt: "desc",
      });
      return folders;
    },
    folder: async (parent, args) => {
      const { folderId } = args;
      const foundFolder = await FolderModel.findById(folderId);
      return foundFolder;
    },
    note: (parent, args) => {
      const { noteId } = args;
      return fakeData.notes.find((note) => note.id === noteId);
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
  Mutation: {
    addFolder: async (parent, args) => {
      const newFolder = new FolderModel({ ...args, authorId: "1" });
      await newFolder.save();
      return newFolder;
    },
  },
};
