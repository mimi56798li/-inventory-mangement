"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import PantryList from "../components/PantryList";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const itemsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsArray);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter(
        (item) =>
          item.name &&
          typeof item.name === "string" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items]);

  return (
    <Box
      sx={{
        width: "screen",
        height: "screen",
        color: (theme) => theme.palette.text.primary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        backgroundColor: (theme) => theme.palette.background.default,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 2,
            color: (theme) => theme.palette.primary.main,
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Pantry Tracker
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
            mb: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <TextField
            label="Search Items"
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              background: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0ef",
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#0ef",
              },
            }}
          />
          <Link href="/add-item" passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 3,
                height: 50,
                fontSize: { xs: "0.875rem", sm: "1rem" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Add Item
            </Button>
          </Link>
        </Box>
      </Box>
      <PantryList items={filteredItems} />
    </Box>
  );
}
