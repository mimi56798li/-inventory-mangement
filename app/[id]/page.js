"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";
import { db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";

export default function EditItemPage({ params }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        if (id) {
          const docRef = doc(db, "items", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setName(docSnap.data().name);
            setQuantity(docSnap.data().quantity);
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleUpdateItem = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || quantity.trim() === "") {
      alert("Both fields are required.");
      return;
    }

    try {
      const docRef = doc(db, "items", id);
      await updateDoc(docRef, { name, quantity });
      router.push("/");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Failed to update item. Please try again.");
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
            Edit Item
          </Typography>
          <form onSubmit={handleUpdateItem}>
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
                  color: "gray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#003366",
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
                  color: "gray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#003366",
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
              Update Item
            </Button>
          </form>
        </Box>
      </motion.div>
    </Box>
  );
}
