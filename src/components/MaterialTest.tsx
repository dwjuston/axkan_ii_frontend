import React from 'react';
import { 
  Button, 
  Typography, 
  Container, 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Paper,
  Grid
} from '@mui/material';
import { 
  Brightness4 as DarkModeIcon, 
  Brightness7 as LightModeIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

const MaterialTest: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Material-UI Test
          </Typography>
          <IconButton color="inherit">
            <DarkModeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Welcome Section */}
          <Grid xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                Welcome to Material-UI
              </Typography>
              <Typography variant="body1" paragraph>
                This is a simple test page to verify that Material-UI is working correctly.
                You can see various Material-UI components in action.
              </Typography>
            </Paper>
          </Grid>

          {/* Button Section */}
          <Grid xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Buttons
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" color="primary">
                  Primary
                </Button>
                <Button variant="contained" color="secondary">
                  Secondary
                </Button>
                <Button variant="outlined" color="primary">
                  Outlined
                </Button>
                <Button variant="text" color="primary">
                  Text
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Icons Section */}
          <Grid xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Icons
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <IconButton color="primary">
                  <DarkModeIcon />
                </IconButton>
                <IconButton color="secondary">
                  <LightModeIcon />
                </IconButton>
                <IconButton color="primary">
                  <MenuIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MaterialTest; 