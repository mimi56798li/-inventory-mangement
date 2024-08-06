"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const AddItemForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "items"), { name, quantity });
    router.push("/");
  };

  return (
    <Box
      width={"400px"}
      padding={3}
      margin={"auto"}
      border={1}
      borderColor={"#ddd"}
      borderRadius={2}
      bgcolor={"#fff"}
    >
      <Typography variant="h6" gutterBottom>
        Add New Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Item Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Quantity"
          fullWidth
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Item
        </Button>
      </form>
    </Box>
  );
};

export default AddItemForm;
