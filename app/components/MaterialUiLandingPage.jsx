import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, Grid, Fade, Zoom } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    background: {
      default: '#E3F2FD',
    },
  },
});

const MaterialUiLandingPage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading effect
    setTimeout(() => setLoaded(true), 500); // Start animation after 500ms
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            background: "linear-gradient(to right, #BBDEFB, #90CAF9, #64B5F6)",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Navbar */}
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, color: "#fff" }}>
                Booking Neumories
              </Typography>
              <Button variant="outlined" color="inherit">
                Daftar
              </Button>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Container maxWidth="md" sx={{ mt: 4 }}>
            <Grid container spacing={4} alignItems="center">
              {/* Image */}
              <Grid item xs={12} md={6}>
                <Zoom in={loaded} timeout={1000}>
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                    alt="Wedding Photography"
                    sx={{
                      width: "100%",
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  />
                </Zoom>
              </Grid>

              {/* Text and Button */}
              <Grid item xs={12} md={6}>
                <Fade in={loaded} timeout={1200}>
                  <Box>
                    <Typography
                      variant="h3"
                      component="h1"
                      gutterBottom
                      sx={{ color: "#fff" }}
                    >
                      Capture Your Perfect Day
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#f5f5f5", mb: 4 }}
                    >
                      With Neumories, your wedding photography is in the hands
                      of professionals who know how to turn every moment into a
                      timeless memory.
                    </Typography>
                    <Button variant="contained" size="large" color="primary">
                      Daftar Sekarang
                    </Button>
                  </Box>
                </Fade>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default MaterialUiLandingPage;
