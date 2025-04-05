import React, { useState } from 'react';
import {
  // Layout components
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  
  // Input components
  Button,
  Checkbox,
  Chip,
  Fab,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Rating,
  Select,
  Slider,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  
  // Feedback components
  Alert,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Snackbar,
  Tooltip,
  
  // Data display components
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  
  // Navigation components
  Breadcrumbs,
  Link,
  Menu,
  Pagination,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stepper,
  Step,
  StepLabel,
  Tabs as MuiTabs,
  Tab as MuiTab,
  
  // Theme
  ThemeProvider,
  createTheme,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

// Import icons from @mui/icons-material
import AddIcon from '@mui/icons-material/Add';
import DarkModeIcon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/Brightness7';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FacebookIcon from '@mui/icons-material/Facebook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import MailIcon from '@mui/icons-material/Mail';

// Sample data for tables and lists
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User' },
];

const MaterialShowcase: React.FC = () => {
  // State for various components
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [ratingValue, setRatingValue] = useState<number | null>(2);
  const [sliderValue, setSliderValue] = useState<number>(30);
  const [checkboxValues, setCheckboxValues] = useState({
    option1: true,
    option2: false,
    option3: true,
  });
  const [radioValue, setRadioValue] = useState('option1');
  const [switchValue, setSwitchValue] = useState(true);
  const [toggleValue, setToggleValue] = useState<string | null>('left');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Create theme based on dark mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 500,
      },
      h2: {
        fontWeight: 500,
      },
      h3: {
        fontWeight: 500,
      },
      h4: {
        fontWeight: 500,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: darkMode 
              ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
              : '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  // Handlers
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setRatingValue(newValue);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValues({
      ...checkboxValues,
      [event.target.name]: event.target.checked,
    });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchValue(event.target.checked);
  };

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null,
  ) => {
    setToggleValue(newValue);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackbarOpen = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleSpeedDialOpen = () => {
    setSpeedDialOpen(true);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialOpen(false);
  };

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCardExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Drawer content
  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Material-UI
        </Typography>
        <IconButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Material-UI v7.0.1
        </Typography>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Material-UI Showcase
            </Typography>
            <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>My account</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {drawerContent}
        </Drawer>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          {/* Tabs Navigation */}
          <Paper sx={{ mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="Material-UI components tabs"
            >
              <Tab label="Overview" />
              <Tab label="Inputs" />
              <Tab label="Feedback" />
              <Tab label="Data Display" />
              <Tab label="Navigation" />
            </Tabs>
          </Paper>

          {/* Overview Tab */}
          {tabValue === 0 && (
            <Stack spacing={4}>
              {/* Welcome Section */}
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                  Welcome to Material-UI
                </Typography>
                <Typography variant="body1" paragraph>
                  Material-UI is a comprehensive React UI library that implements Google's Material Design.
                  It provides a collection of pre-built components to help you build beautiful, responsive applications.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<InfoIcon />}
                    onClick={() => handleSnackbarOpen('Welcome to Material-UI!')}
                  >
                    Learn More
                  </Button>
                </Box>
              </Paper>

              {/* Buttons Section */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Buttons
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Material-UI buttons come in three variants: contained, outlined, and text.
                  They also support different colors, sizes, and states like disabled or loading.
                </Typography>
                <Stack spacing={2}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <Card sx={{ flex: 1 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Basic Buttons</Typography>
                        <Stack direction="row" spacing={1}>
                          <Button variant="contained">Contained</Button>
                          <Button variant="outlined">Outlined</Button>
                          <Button variant="text">Text</Button>
                        </Stack>
                      </CardContent>
                    </Card>
                    <Card sx={{ flex: 1 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Icon Buttons</Typography>
                        <Stack direction="row" spacing={1}>
                          <IconButton color="primary">
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton color="secondary">
                            <ShareIcon />
                          </IconButton>
                          <IconButton color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Stack>
                </Stack>
              </Paper>

              {/* Cards Section */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Cards
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Cards are surfaces that display content and actions on a single topic.
                  They should be easy to scan for relevant and actionable information.
                </Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  {[1, 2, 3].map((card) => (
                    <Grid item xs={12} sm={6} md={4} key={card}>
                      <Card>
                        <CardHeader
                          avatar={
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {card}
                            </Avatar>
                          }
                          title={`Card ${card}`}
                          subheader="September 14, 2023"
                        />
                        <CardMedia
                          component="img"
                          height="140"
                          image={`https://source.unsplash.com/random/300x200?${card}`}
                          alt={`Card ${card} image`}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            This is a sample card with some content. Cards can contain various elements like text, images, and actions.
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Learn More</Button>
                          <Button size="small">Share</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Stack>
          )}

          {/* Inputs Tab */}
          {tabValue === 1 && (
            <Stack spacing={4}>
              {/* Text Fields */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Text Fields
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Text fields let users enter and edit text.
                </Typography>
                <Stack spacing={2}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <Card sx={{ flex: 1 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Text Fields</Typography>
                        <Stack spacing={2}>
                          <TextField label="Standard" variant="outlined" />
                          <TextField label="Filled" variant="filled" />
                          <TextField label="Standard" variant="standard" />
                        </Stack>
                      </CardContent>
                    </Card>
                    <Card sx={{ flex: 1 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Select & Checkbox</Typography>
                        <Stack spacing={2}>
                          <FormControl fullWidth>
                            <InputLabel>Select</InputLabel>
                            <Select label="Select" value={1}>
                              <MenuItem value={1}>Option 1</MenuItem>
                              <MenuItem value={2}>Option 2</MenuItem>
                              <MenuItem value={3}>Option 3</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControlLabel control={<Checkbox />} label="Checkbox" />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Stack>
                </Stack>
              </Paper>

              {/* Selection Controls */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Selection Controls
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Selection controls allow users to complete tasks that involve making choices such as selecting options, or switching settings on or off.
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Checkboxes</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkboxValues.option1}
                              onChange={handleCheckboxChange}
                              name="option1"
                            />
                          }
                          label="Option 1"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkboxValues.option2}
                              onChange={handleCheckboxChange}
                              name="option2"
                            />
                          }
                          label="Option 2"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkboxValues.option3}
                              onChange={handleCheckboxChange}
                              name="option3"
                            />
                          }
                          label="Option 3"
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Radio Buttons</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={radioValue}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                        <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                        <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Switches</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={switchValue}
                              onChange={handleSwitchChange}
                            />
                          }
                          label="Switch 1"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Switch 2"
                        />
                        <FormControlLabel
                          control={<Switch disabled />}
                          label="Disabled"
                        />
                        <FormControlLabel
                          control={<Switch disabled checked />}
                          label="Disabled Checked"
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Toggle Buttons</FormLabel>
                      <ToggleButtonGroup
                        value={toggleValue}
                        exclusive
                        onChange={handleToggleChange}
                        aria-label="text alignment"
                      >
                        <ToggleButton value="left" aria-label="left aligned">
                          Left
                        </ToggleButton>
                        <ToggleButton value="center" aria-label="centered">
                          Center
                        </ToggleButton>
                        <ToggleButton value="right" aria-label="right aligned">
                          Right
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>

              {/* Sliders and Ratings */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Sliders and Ratings
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Sliders and ratings allow users to make selections from a range of values.
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography id="slider-label" gutterBottom>
                      Slider
                    </Typography>
                    <Slider
                      aria-labelledby="slider-label"
                      value={sliderValue}
                      onChange={handleSliderChange}
                      valueLabelDisplay="auto"
                      step={10}
                      marks
                      min={0}
                      max={100}
                    />
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        Value: {sliderValue}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography component="legend">Rating</Typography>
                    <Rating
                      name="simple-controlled"
                      value={ratingValue}
                      onChange={handleRatingChange}
                      precision={0.5}
                    />
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        Value: {ratingValue}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* Select and Chips */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Select and Chips
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Select components are used for collecting user provided information from a list of options.
                  Chips are compact elements that represent an input, attribute, or action.
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={10}
                        label="Age"
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip label="Basic" />
                      <Chip label="Disabled" disabled />
                      <Chip
                        avatar={<Avatar>M</Avatar>}
                        label="Avatar"
                      />
                      <Chip
                        icon={<FavoriteIcon />}
                        label="With Icon"
                        color="primary"
                      />
                      <Chip
                        label="Deletable"
                        onDelete={() => {}}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Stack>
          )}

          {/* Feedback Tab */}
          {tabValue === 2 && (
            <Stack spacing={4}>
              {/* Alerts */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Alerts
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Alerts display a short, important message in a way that attracts the user's attention without interrupting the user's task.
                </Typography>
                <Stack spacing={1}>
                  <Alert severity="success">Success message</Alert>
                  <Alert severity="info">Info message</Alert>
                  <Alert severity="warning">Warning message</Alert>
                  <Alert severity="error">Error message</Alert>
                </Stack>
              </Paper>

              {/* Dialogs */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Dialogs
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={handleDialogOpen}>
                    Open Dialog
                  </Button>
                  <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                  >
                    <DialogTitle>
                      Dialog Title
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        This is a dialog. Dialogs are used to inform users about a task or to require decisions.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDialogClose}>Cancel</Button>
                      <Button onClick={handleDialogClose} autoFocus>
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Paper>

              {/* Snackbars */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Snackbars
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Snackbars provide brief messages about app processes. The component is also known as a toast notification.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={() => handleSnackbarOpen('This is a snackbar message!')}>
                    Open Snackbar
                  </Button>
                  <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                    action={
                      <IconButton
                        size="small"
                        color="inherit"
                        onClick={handleSnackbarClose}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    }
                  />
                </Box>
              </Paper>

              {/* Tooltips */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Tooltips
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Tooltips display informative text when users hover over, focus on, or tap an element.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Tooltip title="Delete">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add">
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="You don't have permission to do this">
                    <span>
                      <IconButton disabled>
                        <DeleteIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
              </Paper>
            </Stack>
          )}

          {/* Data Display Tab */}
          {tabValue === 3 && (
            <Stack spacing={4}>
              {/* Tables */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Tables
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Tables display sets of data. They can be fully customized.
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sampleUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {user.name}
                          </TableCell>
                          <TableCell align="right">{user.email}</TableCell>
                          <TableCell align="right">{user.role}</TableCell>
                          <TableCell align="right">
                            <IconButton size="small">
                              <EditIcon />
                            </IconButton>
                            <IconButton size="small">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              {/* Avatars and Badges */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Avatars and Badges
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Avatars can be used to represent people or objects. Badges generate a small badge to the top-right of its child(ren).
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                  <Avatar>H</Avatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>N</Avatar>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>OP</Avatar>
                  <Avatar sx={{ bgcolor: 'success.main' }}>A</Avatar>
                  <Avatar sx={{ bgcolor: 'error.main' }}>B</Avatar>
                  <Avatar sx={{ bgcolor: 'warning.main' }}>C</Avatar>
                  <Avatar sx={{ bgcolor: 'info.main' }}>D</Avatar>
                  <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 4 }}>
                  <Badge badgeContent={4} color="primary">
                    <EmailIcon />
                  </Badge>
                  <Badge badgeContent={4} color="secondary">
                    <EmailIcon />
                  </Badge>
                  <Badge badgeContent={4} color="error">
                    <EmailIcon />
                  </Badge>
                  <Badge badgeContent={99} color="error">
                    <EmailIcon />
                  </Badge>
                  <Badge badgeContent={100} color="error">
                    <EmailIcon />
                  </Badge>
                  <Badge badgeContent={100} max={999} color="error">
                    <EmailIcon />
                  </Badge>
                </Box>
              </Paper>

              {/* Expandable Cards */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Expandable Cards
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Cards that can be expanded to show more content.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {[1, 2, 3].map((card) => (
                    <Card key={card} sx={{ mb: 2 }}>
                      <CardHeader
                        title={`Expandable Card ${card}`}
                        subheader="Click to expand"
                        action={
                          <IconButton
                            aria-label="expand"
                            onClick={() => handleCardExpand(card)}
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        }
                      />
                      <Collapse in={expandedCard === card} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography paragraph>
                            This is the expanded content of the card. It can contain any information you want to show when the card is expanded.
                          </Typography>
                          <Typography paragraph>
                            You can add multiple paragraphs, images, or other components here.
                          </Typography>
                        </CardContent>
                      </Collapse>
                    </Card>
                  ))}
                </Box>
              </Paper>
            </Stack>
          )}

          {/* Navigation Tab */}
          {tabValue === 4 && (
            <Stack spacing={4}>
              {/* Breadcrumbs */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Breadcrumbs
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Breadcrumbs allow users to make selections from a range of values.
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" href="#">
                    Home
                  </Link>
                  <Link color="inherit" href="#">
                    Core
                  </Link>
                  <Typography color="text.primary">Breadcrumb</Typography>
                </Breadcrumbs>
              </Paper>

              {/* Pagination */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Pagination
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Pagination allows users to navigate between pages of content.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Pagination count={10} color="primary" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Pagination count={10} color="secondary" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Pagination count={10} disabled />
                </Box>
              </Paper>

              {/* Stepper */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Stepper
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Steppers display progress through a sequence of logical and numbered steps.
                </Typography>
                <Box sx={{ width: '100%', mt: 2 }}>
                  <Stepper activeStep={activeStep}>
                    <Step>
                      <StepLabel>Step 1</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>Step 2</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>Step 3</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>Step 4</StepLabel>
                    </Step>
                  </Stepper>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBackStep}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNextStep}>
                      {activeStep === 3 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </Box>
              </Paper>

              {/* Speed Dial */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Speed Dial
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Speed dial provides quick access to common actions.
                </Typography>
                <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                  <SpeedDial
                    ariaLabel="SpeedDial example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    onClose={handleSpeedDialClose}
                    onOpen={handleSpeedDialOpen}
                    open={speedDialOpen}
                  >
                    <SpeedDialAction
                      icon={<FileCopyIcon />}
                      tooltipTitle="Copy"
                    />
                    <SpeedDialAction
                      icon={<SaveIcon />}
                      tooltipTitle="Save"
                    />
                    <SpeedDialAction
                      icon={<PrintIcon />}
                      tooltipTitle="Print"
                    />
                    <SpeedDialAction
                      icon={<ShareIcon />}
                      tooltipTitle="Share"
                    />
                  </SpeedDial>
                </Box>
              </Paper>
            </Stack>
          )}
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.mode === 'light' ? 0.05 : 0.1
              ),
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              {'Material-UI Showcase © '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Container>
        </Box>
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => handleSnackbarOpen('FAB clicked!')}
      >
        <AddIcon />
      </Fab>
    </ThemeProvider>
  );
};

export default MaterialShowcase; 