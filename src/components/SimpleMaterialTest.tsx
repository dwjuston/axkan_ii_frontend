import React from 'react';
import { Button, Typography, Box, Container } from '@mui/material';

const SimpleMaterialTest: React.FC = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material-UI Test
        </Typography>
        <Button variant="contained" color="primary">
          Click Me
        </Button>
      </Box>
    </Container>
  );
};

export default SimpleMaterialTest; 