export const notesLoader = async ({ params }) => {
  const query = `query ExampleQuery($folderId: String) {
      folder(folderId: $folderId) {
        id
        name
        notes {
          id
          content
        }
      }
    }`;

  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        folderId: params.folderId,
      },
    }),
  });

  const { data } = await res.json();
  return data;
};

export const noteLoader = async ({ params }) => {
  const query = `query Note($noteId: String) {
      note(noteId: $noteId) {
        id
        content
      }
    }`;

  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        noteId: params.noteId,
      },
    }),
  });

  const { data } = await res.json();
  return data;
}