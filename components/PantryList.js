"use client";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PantryList = ({ items, setItems }) => {
  const router = useRouter();

  const handleDeleteItem = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const docRef = doc(db, "items", id);
        await deleteDoc(docRef);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Failed to delete item. Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
        maxWidth: "1500px",
        margin: "auto",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {items.length > 0 ? (
        items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{ width: "100%" }}
          >
            <Box
              border={1}
              borderColor={"#ddd"}
              borderRadius={2}
              padding={2}
              marginBottom={2}
              bgcolor={"#003366"}
              color={"#f5f5dc"}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
              flexWrap="wrap"
              sx={{ boxSizing: "border-box" }}
            >
              <Box flex={1} display="flex" flexDirection="column" gap={1}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#f5f5dc",
                    fontSize: { xs: "1.3rem", sm: "1.3rem", md: "1.3rem" },
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#f5f5dc",
                    fontSize: {
                      xs: "0.95rem",
                      sm: "0.95rem",
                      md: "0.95rem",
                    },
                  }}
                >
                  Quantity: {item.quantity}
                </Typography>
              </Box>
              <Box
                display="flex"
                gap={1}
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretch", sm: "center" }}
                width={{ xs: "100%", sm: "auto" }}
              >
                <Link href={`/edit/${item.id}`}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#0ef",
                      color: "#001a33",
                      "&:hover": {
                        backgroundColor: {opacity:20},
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      },
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#c82333",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                    width: { xs: "100%", sm: "auto" },
                  }}
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </motion.div>
        ))
      ) : (
        <Typography
        sx={{
          color:"white"
        }}>No items found</Typography>
      )}
    </Box>
  );
};

export default PantryList;
