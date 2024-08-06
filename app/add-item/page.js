"use client";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AddItemPage() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const router = useRouter();

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || quantity.trim() === "") {
      alert("Both fields are required.");
      return;
    }

    try {
      await addDoc(collection(db, "items"), { name, quantity });
      router.push("/");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add item. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#001a33",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          width={"400px"}
          padding={3}
          border={1}
          borderColor={"gray"}
          borderRadius={2}
          bgcolor={"#fff"}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }} gutterBottom>
            Add New Item
          </Typography>
          <form onSubmit={handleAddItem}>
            <TextField
              label="Item Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#003366",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "gray", // Default label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#003366", // Label color when focused
                },
              }}
            />
            <TextField
              label="Quantity"
              fullWidth
              margin="normal"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray",
                  },
                  "&:hover fieldset": {
                    borderColor: "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#003366",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "gray", // Default label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#003366", // Label color when focused
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#003366",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#002244",
                  opacity: 0.8,
                },
              }}
              fullWidth
            >
              Add Item
            </Button>
          </form>
        </Box>
      </motion.div>
    </Box>
  );
}
