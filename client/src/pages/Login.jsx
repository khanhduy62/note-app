import React, { useContext, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { graphQLRequest } from "../utils/request";

export default function Login() {
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    const query = `mutation Mutation($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        id
        name
      }
    }
    `;

    const data = await graphQLRequest({
      query,
      variables: { uid, name: displayName },
    });

  };

  useEffect(() => {
    if (user?.uid) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome to Note App
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}
