import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, CardActions, List, ListItem, ListItemText, Divider } from '@mui/material';
import carImage from './bmw-car.png';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/cars/${id}`)
      .then((response) => response.json())
      .then((data) => setCar(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!car) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        pl: 30,
        pr: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      {/* Left side: Car details */}
      <Card sx={{ width: '50%' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {car.Brand} {car.Model}
          </Typography>

          <List disablePadding>
            {Object.keys(car).map((key) => {
              if (key === '_id' || key === '__v') return null;

              return (
                <React.Fragment key={key}>
                  <ListItem disablePadding>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <strong>{key}</strong>
                          <span>{String(car[key])}</span>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </CardActions>
      </Card>

      {/* Right side: Image */}
      <Box>
        <img
          src={carImage}
          alt="Car"
          style={{ width: '550px', height: 'auto', borderRadius: '10px' }}
        />
      </Box>
    </Box>
  );
};

export default CarDetails;
