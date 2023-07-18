import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import LottieAnimation from "./Loaders/FoodLoader"
import { useState, useEffect } from 'react';
import { getAllFood, searchFood, addFood, updateFood, deleteFood } from './services/FoodService';
import Food from "./models/Food";
import {
  Card,
  Grid,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Button,
  Container,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from "@mui/material"


import DynamicSnackbar from './Snackbar/DynamicSnackbar';


function App() {
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState([]);
  const [addFoodDialog, setAddFoodDialog] = useState(false);
  const [updateFoodDialog, setUpdateFoodDialog] = useState(false);
  const [deleteFoodDialog, setDeleteFoodDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState(new Food());
  const [updatedFood, setUpdatedFood] = useState(new Food());
  const [addedFood, setAddedFood] = useState(new Food());
  const [IsSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [SnackbarType, setSnackbarType] = useState("success");
  const [SnackbarMessage, setSnackbarMessage] = useState("a message");
  const [search, setSearch] = useState("");



  useEffect(() => { handleGetAllFood() }, []);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (addFoodDialog || updateFoodDialog || deleteFoodDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [addFoodDialog, updateFoodDialog, deleteFoodDialog]);


  const initUpdatedFood = (food) => {
    setUpdatedFood(new Food(
      food._id,
      food.name,
      food.price,
      food.quantity,
      food.image
    ))
  }

  const handleAddDialogOpen = (food) => {
    setAddedFood(new Food());
    setAddFoodDialog(true);
  }

  const handleUpdateDialogOpen = (food) => {
    initUpdatedFood(food);
    setSelectedFood(food);
    setUpdateFoodDialog(true);
  }

  const handleDeleteDialogOpen = (food) => {
    setSelectedFood(food);
    setDeleteFoodDialog(true);
  }


  const handleAddDialogClose = () => {
    setAddFoodDialog(false);
  }

  const handleUpdateDialogClose = () => {
    setUpdateFoodDialog(false);
  }

  const handleDeleteDialogClose = () => {
    setDeleteFoodDialog(false);
  }

  const handleGetAllFood = async () => {
    try {
      setLoading(true);
      await getAllFood().then(response => {
        setFood(response.data.food);
        setLoading(false);
      }).catch(error => {
        console.log(error)
        setLoading(false);
      });
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    }
  };

  const handleAddFood = async () => {
    try {
      handleAddDialogClose();
      setLoading(true);
      var request = { food: addedFood }
      await addFood(request).then(async (response) => {
        await handleGetAllFood();
        setLoading(false);
        setSnackbarType("success")
        setSnackbarMessage(response.data.message);
        setIsSnackbarOpen(true);
      }).catch(error => {
        setLoading(false);
        console.log(error);
        setSnackbarType("error")
        setSnackbarMessage(error.response.data.message);
        setIsSnackbarOpen(true);
      })
    } catch (error) {
      setLoading(false);
      console.log(error);
      handleAddDialogClose();
    }
  }


  const handleUpdateFood = async () => {
    try {
      handleUpdateDialogClose();
      setLoading(true);
      var request = { food: updatedFood }
      console.log(request);
      await updateFood(request).then(async (response) => {
        await handleGetAllFood();
        setLoading(false);
        setSnackbarType("success")
        setSnackbarMessage(response.data.message);
        setIsSnackbarOpen(true);
      }).catch(error => {
        setLoading(false);
        console.log(error);
        setSnackbarType("error")
        setSnackbarMessage(error.response.data.message);
        setIsSnackbarOpen(true);
      })
    } catch (error) {
      setLoading(false);
      console.log(error);
      handleAddDialogClose();
    }
  }

  const handleDeleteFood = async () => {
    try {
      handleDeleteDialogClose();
      setLoading(true);
      await deleteFood(selectedFood._id).then(async (response) => {
        await handleGetAllFood();
        setLoading(false);
        setSnackbarType("success")
        console.log(response);
        setSnackbarMessage(response.data.message);
        setIsSnackbarOpen(true);
      }).catch(error => {
        setLoading(false);
        console.log(error);
        setSnackbarType("error")
        setSnackbarMessage(error.response.data.message);
        setIsSnackbarOpen(true);
      })
    } catch (error) {
      setLoading(false);
      console.log(error);
      handleAddDialogClose();
    }
  }


  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFood((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddedFood((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCloseSnackbar = (e) => {
    setIsSnackbarOpen(false);
  };


  const handleSearchChange = async (e) => {
    const { name, value } = e.target;
    setSearch(value);
  };

  const handleSearch = async () => {
    try {
      await searchFood(search).then(async (response) => {
        setFood(response.data.food);
      }).catch(error => {
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
      console.log('User stopped typing. Do something with:', search);
    }, 500); // Adjust the debounce delay as needed (e.g., 1000ms = 1 second)

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [search]);


  return (

    <div className='mainContainer'>

      <DynamicSnackbar open={IsSnackbarOpen} message={SnackbarMessage} type={SnackbarType} onClose={handleCloseSnackbar} />

      <TextField className='input' onChange={handleSearchChange} name='search' id="Search" label="Search Food" variant="standard" />

      <Button variant='contained' style={{ width: "10em" }} onClick={handleAddDialogOpen}>Add Food</Button>

      
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={addFoodDialog}
        onClose={handleAddDialogClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <DialogTitle className="dialog" id="scroll-dialog-title">Add Food</DialogTitle>
        <DialogContent className="dialogContent" dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className='col'>
              <TextField className='input' onChange={handleAddChange} name='name' fullWidth id="AddName" label="Name" variant="standard" />
              <TextField className='input' type='number' onChange={handleAddChange} name='price' fullWidth id="AddPrice" label="Price" variant="standard" />
              <TextField className='input' type='number' onChange={handleAddChange} name='quantity' fullWidth id="AddQuantity" label="Quantity" variant="standard" />
              <TextField className='input' onChange={handleAddChange} name='image' fullWidth id="AddImage" label="Image" variant="standard" />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: "13px" }} className="dialog">
          <Button onClick={handleAddDialogClose} color='secondary'>Close</Button>
          <Button onClick={handleAddFood}>Add</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={updateFoodDialog}
        onClose={handleUpdateDialogClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <DialogTitle className="dialog" id="scroll-dialog-title">Update Food</DialogTitle>
        <DialogContent className="dialogContent" dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className='col'>
              <TextField className='input' onChange={handleUpdateChange} name='name' fullWidth id="UpdateName" value={updatedFood.name} label="Name" variant="standard" />
              <TextField className='input' type='number' onChange={handleUpdateChange} name='price' fullWidth id="UpdatePrice" label="Price" value={updatedFood.price} variant="standard" />
              <TextField className='input' type='number' onChange={handleUpdateChange} name='quantity' fullWidth id="UpdateQuantity" label="Quantity" value={updatedFood.quantity} variant="standard" />
              <TextField className='input' onChange={handleUpdateChange} name='image' fullWidth id="UpdateImage" label="Image" value={updatedFood.image} variant="standard" />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: "13px" }} className="dialog">
          <Button onClick={handleUpdateDialogClose} color='secondary'>Close</Button>
          <Button onClick={handleUpdateFood}>Update</Button>
        </DialogActions>
      </Dialog>




      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={deleteFoodDialog}
        onClose={handleDeleteDialogClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <DialogTitle className="dialog" id="scroll-dialog-title">Delete Food</DialogTitle>
        <DialogContent className="dialogContent" dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            Are you sure you want to delete "{selectedFood.name}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: "13px" }} className="dialog">
          <Button onClick={handleDeleteDialogClose} color='secondary'>Cancel</Button>
          <Button onClick={handleDeleteFood}>Delete</Button>
        </DialogActions>
      </Dialog>



      {loading && <div className="App">
        <LottieAnimation></LottieAnimation>
      </div>}


      <Grid container style={{ marginTop: "5em" }} spacing={3}>
        {
          food.length != 0 &&
          food.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt="[Food]"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="h7" color="text.secondary">
                      {item.price}dt - {item.quantity} dishes left
                    </Typography>
                    <div className='row' style={{ justifyContent: "space-around", marginTop: "2em" }}>
                      <Button variant='outlined' onClick={() => { handleUpdateDialogOpen(item) }}>Update</Button>
                      <Button variant='outlined' color='error' onClick={() => { handleDeleteDialogOpen(item) }}>Delete</Button>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export default App;
