import React, { useState, useEffect  } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAddressBook, cilTrash, cilColorBorder, cilSearch, cilPlus } from '@coreui/icons'
// import Ckeditor from "../base/Ckeditor/Ckeditor"
import { CKEditor } from 'ckeditor4-react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Box,
  DialogContentText,
  Grid ,
  Typography,
  styled,
  ToggleButtonGroup,
   ToggleButton
  
} from '@mui/material';


const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  
}));

const StyledHeading= styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1),
  backgroundColor: '#1976d2',  // Using the specified color
  borderRadius: 4,
  color: 'white',  // Setting text color to white for better contrast
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  '& .MuiToggleButton-root': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    flex: '1 0 18%', // Allows for 5 buttons per row on most screen sizes
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

const ncertData = {
  "V": {
    subjects: ["Math", "Science"],
    chapters: {
      "Math": [
        "The Fish Tale",
        "Shapes and Angles",
        "How Many Squares?",
        "Parts and Wholes",
        // Add more chapters
      ],
      "Science": [
        "Super Senses",
        "A Snake Charmer's Story",
        "From Tasting to Digesting",
        "Mangoes Round the Year",
        // Add more chapters
      ]
    }
  },
  "VI": {
    subjects: ["Math", "Science"],
    chapters: {
      "Math": [
        "Knowing Our Numbers",
        "Whole Numbers",
        "Playing with Numbers",
        "Basic Geometrical Ideas",
        // Add more chapters
      ],
      "Science": [
        "Food: Where Does It Come From?",
        "Components of Food",
        "Fibre to Fabric",
        "Sorting Materials and Groups",
        // Add more chapters
      ]
    }
  },
  "VII": {
    subjects: ["Math", "Science"],
    chapters: {
      "Math": [
        "Integers",
        "Fractions and Decimals",
        "Data Handling",
        "Simple Equations",
        // Add more chapters
      ],
      "Science": [
        "Nutrition in Plants",
        "Nutrition in Animals",
        "Fibre to Fabric",
        "Heat",
        // Add more chapters
      ]
    }
  },
  "VIII": {
    subjects: ["Math", "Science"],
    chapters: {
      "Math": [
        "Rational Numbers",
        "Linear Equations in One Variable",
        "Understanding Quadrilaterals",
        "Practical Geometry",
        // Add more chapters
      ],
      "Science": [
        "Crop Production and Management",
        "Microorganisms: Friend and Foe",
        "Synthetic Fibres and Plastics",
        "Materials: Metals and Non-Metals",
        // Add more chapters
      ]
    }
  },
  "IX": {
    subjects: ["Math", "Science", "Physics", "Chemistry", "Biology"],
    chapters: {
      "Math": [
        "Number Systems",
        "Polynomials",
        "Coordinate Geometry",
        "Linear Equations in Two Variables",
        // Add more chapters
      ],
      "Science": [
        "Matter in Our Surroundings",
        "Is Matter Around Us Pure?",
        "Atoms and Molecules",
        "Structure of the Atom",
        // Add more chapters
      ],
      "Physics": [
        "Motion",
        "Force and Laws of Motion",
        "Gravitation",
        "Work and Energy",
        // Add more chapters
      ],
      "Chemistry": [
        "Matter in Our Surroundings",
        "Is Matter Around Us Pure?",
        "Atoms and Molecules",
        "Structure of the Atom",
        // Add more chapters
      ],
      "Biology": [
        "The Fundamental Unit of Life",
        "Tissues",
        "Diversity in Living Organisms",
        "Why Do We Fall Ill?",
        // Add more chapters
      ]
    }
  },
  "X": {
    subjects: ["Math", "Science", "Physics", "Chemistry", "Biology"],
    chapters: {
      "Math": [
        "Real Numbers",
        "Polynomials",
        "Pair of Linear Equations in Two Variables",
        "Quadratic Equations",
        // Add more chapters
      ],
      "Science": [
        "Chemical Reactions and Equations",
        "Acids, Bases and Salts",
        "Metals and Non-Metals",
        "Carbon and its Compounds",
        // Add more chapters
      ],
      "Physics": [
        "Electricity",
        "Magnetic Effects of Electric Current",
        "Sources of Energy",
        "Light: Reflection and Refraction",
        // Add more chapters
      ],
      "Chemistry": [
        "Chemical Reactions and Equations",
        "Acids, Bases and Salts",
        "Metals and Non-Metals",
        "Carbon and its Compounds",
        // Add more chapters
      ],
      "Biology": [
        "Life Processes",
        "Control and Coordination",
        "How do Organisms Reproduce?",
        "Heredity and Evolution",
        // Add more chapters
      ]
    }
  },
  "XI-science": {
    subjects: ["Math", "Physics", "Chemistry", "Biology"],
    chapters: {
      "Math": [
        "Sets",
        "Relations and Functions",
        "Trigonometric Functions",
        "Principle of Mathematical Induction",
        // Add more chapters
      ],
      "Physics": [
        "Physical World",
        "Units and Measurements",
        "Motion in a Straight Line",
        "Motion in a Plane",
        // Add more chapters
      ],
      "Chemistry": [
        "Some Basic Concepts of Chemistry",
        "Structure of Atom",
        "Classification of Elements and Periodicity in Properties",
        "Chemical Bonding and Molecular Structure",
        // Add more chapters
      ],
      "Biology": [
        "The Living World",
        "Biological Classification",
        "Plant Kingdom",
        "Animal Kingdom",
        // Add more chapters
      ]
    }
  },
  "XII-science": {
    subjects: ["Math", "Physics", "Chemistry", "Biology"],
    chapters: {
      "Math": [
        "Relations and Functions",
        "Inverse Trigonometric Functions",
        "Matrices",
        "Determinants",
        // Add more chapters
      ],
      "Physics": [
        "Electric Charges and Fields",
        "Electrostatic Potential and Capacitance",
        "Current Electricity",
        "Moving Charges and Magnetism",
        // Add more chapters
      ],
      "Chemistry": [
        "Solid State",
        "Solutions",
        "Electrochemistry",
        "Chemical Kinetics",
        // Add more chapters
      ],
      "Biology": [
        "Reproduction in Organisms",
        "Sexual Reproduction in Flowering Plants",
        "Human Reproduction",
        "Reproductive Health",
        // Add more chapters
      ]
    }
  },
  "XI-commerce": {
    subjects: ["Math"],
    chapters: {
      "Math": [
        "Sets",
        "Relations and Functions",
        "Trigonometric Functions",
        "Principle of Mathematical Induction",
        // Add more chapters
      ]
    }
  },
  "XII-commerce": {
    subjects: ["Math"],
    chapters: {
      "Math": [
        "Relations and Functions",
        "Inverse Trigonometric Functions",
        "Matrices",
        "Determinants",
        // Add more chapters
      ]
    }
  }
};


const topics = {
  // Add topics based on class, subject, and chapter
};

const ExamDialog = ({ open, handleClose, initialData, handleSubmit, setFormData, formData }) => {

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        question: '',
        solution: '',
        option: [],
        correctOption: [],
        questionType: '',
        class: '',
        subject: '',
        chapter: '',
        topic: '',
        exam: '',
        status:'',
        difficultyLevel:'',
       
      });
    }
  }, [initialData, setFormData]);

  const [theme, setTheme] = React.useState('custom');

  const handleThemeChange = (event, newTheme) => {
    if (newTheme !== null) {
      setTheme(newTheme);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        correctOption: initialData.correctOption || []
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
      ...(name === 'questionType' && { correctOption: [] }),
    }));
  };

  const handleCorrectOptionChange = (event, newOptions) => {
    const updatedOptions = formData.questionType === 'single choice' 
      ? newOptions.slice(-1) // Only keep the last selected option for single choice
      : newOptions;
    
    setFormData(prevData => ({
      ...prevData,
      correctOption: updatedOptions,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    handleClose();
  };

  const getSubjects = () => {
    if (formData.class && ncertData[formData.class]) {
      return ncertData[formData.class].subjects;
    }
    return [];
  };

  const getChapters = () => {
    if (formData.class && formData.subject && ncertData[formData.class]) {
      return ncertData[formData.class].chapters[formData.subject] || [];
    }
    return [];
  };

  const getTopics = () => {
    if (formData.class && formData.subject && formData.chapter) {
      return topics[formData.class][formData.subject][formData.chapter] || [];
    }
    return [];
  };


  return (
    <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="md">
    <StyledDialogTitle>Add Questions</StyledDialogTitle>
   
    <form onSubmit={onSubmit}>
      <StyledDialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <StyledFormControl fullWidth required>
              <InputLabel id="class-label">Select Class</InputLabel>
              <Select
                labelId="class-label"
                name="class"
                value={formData.class}
                onChange={handleChange}
                label="Select Class"
              >
                <MenuItem value=""><em>-- Select Class --</em></MenuItem>
                {Object.keys(ncertData).map(cls => (
                  <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </Grid>

          <Grid item xs={4}>
              <FormControl fullWidth required>
                <InputLabel id="subject-label">Select Subject</InputLabel>
                <Select
                  labelId="subject-label"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  label="Select Subject"
                  disabled={!formData.class}
                >
                  <MenuItem value=""><em>-- Select Subject --</em></MenuItem>
                  {getSubjects().map(subject => (
                    <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* chapter */}
            <Grid item xs={4}>
              <FormControl fullWidth  required>
                <InputLabel id="chapter-label">Select Chapter</InputLabel>
                <Select
                  labelId="chapter-label"
                  name="chapter"
                  value={formData.chapter}
                  onChange={handleChange}
                  label="Select Chapter"
                  disabled={!formData.subject}
                >
                  <MenuItem value=""><em>-- Select Chapter --</em></MenuItem>
                  {getChapters().map(chapter => (
                    <MenuItem key={chapter} value={chapter}>{chapter}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
        </Grid>
        {/* topics */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <StyledFormControl fullWidth required>
              <InputLabel id="class-label">Select Topics</InputLabel>
              <Select
                labelId="class-label"
                name="class"
                value={formData.class}
                onChange={handleChange}
                label="Select Class"
              >
                <MenuItem value=""><em>-- Select topics --</em></MenuItem>
                {Object.keys(ncertData).map(cls => (
                  <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </Grid>
          <Grid item xs={4}>
              <FormControl fullWidth required>
                <InputLabel id="subject-label">Select Exam</InputLabel>
                <Select
                  labelId="subject-label"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  label="Select Subject"
                  disabled={!formData.class}
                >
                  <MenuItem value=""><em>-- Select exam --</em></MenuItem>
                  {getSubjects().map(subject => (
                    <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            
            
           
        </Grid>

      
        
                <StyledHeading>
          <Typography variant="body2" style={{ color: '#ffffff' }}>
            Please Enter Correct Data
          </Typography>
        </StyledHeading>

        <Grid container spacing={2}>
        <Grid item xs={6}>
              <StyledFormControl fullWidth required>
                <InputLabel id="questionType-label">Select Question Type</InputLabel>
                <Select
                  labelId="questionType-label"
                  name="questionType"
                  value={formData.questionType}
                  onChange={handleChange}
                  label="Select Question Type"
                >
                  <MenuItem value="single choice">Single Choice</MenuItem>
                  <MenuItem value="multiple choice">Multiple Choice</MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={6}>
              <StyledFormControl fullWidth required>
                <InputLabel id="time-label">Select Time</InputLabel>
                <Select
                  labelId="time-label"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  label="Select Time"
                >
                  {[60, 120, 180, 240, 300].map(time => (
                    <MenuItem key={time} value={time}>{time} seconds</MenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Difficulty Level</FormLabel>
                <RadioGroup
                  aria-label="difficultyLevel"
                  name="difficultyLevel"
                  value={formData.difficultyLevel}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                  <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                  <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                </RadioGroup>
              </FormControl>
            </Grid>

            
         
          </Grid>


          <Typography  variant="subtitle1" sx={{  margin:'10px 0'}}>Write Question:</Typography>
          <CKEditor  editorUrl="https://cdn.ckeditor.com/4.18.0/standard-all/ckeditor.js" />


          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Select Correct Option{formData.questionType === 'multiple choice' ? 's' : ''}:
              </Typography>
              <StyledToggleButtonGroup
                value={formData.correctOption}
                onChange={handleCorrectOptionChange}
                aria-label="correct options"
                {...(formData.questionType === 'single choice' ? { exclusive: true } : {})}
              >
                {['A', 'B', 'C', 'D', 'E'].map((option) => (
                  <ToggleButton key={option} value={option} aria-label={`option ${option}`}>
                    {option}
                  </ToggleButton>
                ))}
              </StyledToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                {/* Selected: {formData.correctOption.join(', ')} */}
                Selected Option:{formData.correctOption}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1">Option</Typography>
       <CKEditor/>
    <Typography variant="subtitle1">Solution</Typography>
       <CKEditor/>
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <StyledSubmitButton type="submit" variant="contained" color="primary">
          Submit
        </StyledSubmitButton>
      </StyledDialogActions>
    </form>
  </StyledDialog>
  );
};

const Question = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    question: '',
    solution: '',
    option: [],
    correctOption: [],
    questionType: '',
    class: '',
    subject: '',
    chapter: '',
    topic: '',
    exam: '',
    status:'',
    difficultyLevel:''
  });

  const [tableData, setTableData] = useState([
    {
      id: 1,
      question: "What is the capital of France?",
      solution: "Paris is the capital of France.",
      option: ["Paris", "London", "Berlin", "Madrid"],
      correctOption: ["Paris", "London"],
      questionType: "Geography",
      class: "5",
      subject: "Social Studies",
      chapter: "Countries and Capitals",
      topic: "Europe",
      exam: "Mid-term",
      status:"pending"
    },
    {
      id: 2,
      question: "What is 2 + 2?",
      solution: "2 + 2 equals 4.",
      option: ["3", "4", "5", "6"],
      correctOption: ["4"],
      questionType: "Math",
      class: "3",
      subject: "Mathematics",
      chapter: "Basic Arithmetic",
      topic: "Addition",
      exam: "Unit Test",
      status:"pending"
    },
    {
      id: 3,
      question: "What is the chemical symbol for water?",
      solution: "The chemical symbol for water is H2O.",
      option: ["H2O", "O2", "CO2", "NaCl"],
      correctOption: ["H2O"],
      questionType: "Science",
      class: "6",
      subject: "Chemistry",
      chapter: "Basics of Chemistry",
      topic: "Chemical Formulas",
      exam: "Final Exam",
      status:"pending"
    },
    {
      id: 4,
      question: "Who wrote '1984'?",
      solution: "'1984' was written by George Orwell.",
      option: ["George Orwell", "Aldous Huxley", "Ernest Hemingway", "F. Scott Fitzgerald"],
      correctOption: ["George Orwell"],
      questionType: "Literature",
      class: "8",
      subject: "English",
      chapter: "Famous Authors",
      topic: "Dystopian Novels",
      exam: "Literature Exam",
      status:"pending"
    },
    {
      id: 5,
      question: "What is the largest planet in our Solar System?",
      solution: "Jupiter is the largest planet in our Solar System.",
      option: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctOption: ["Jupiter"],
      questionType: "Astronomy",
      class: "7",
      subject: "Science",
      chapter: "The Solar System",
      topic: "Planets",
      exam: "Astronomy Quiz",
      status:"pending"
    },
    {
      id: 6,
      question: "What is the boiling point of water?",
      solution: "The boiling point of water is 100°C.",
      option: ["90°C", "100°C", "110°C", "120°C"],
      correctOption: ["100°C"],
      questionType: "Science",
      class: "6",
      subject: "Physics",
      chapter: "States of Matter",
      topic: "Boiling and Melting Points",
      exam: "Physics Test",
      status:"pending"
    },
    {
      id: 7,
      question: "Who painted the Mona Lisa?",
      solution: "The Mona Lisa was painted by Leonardo da Vinci.",
      option: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      correctOption:["Leonardo da Vinci"],
      questionType: "Art",
      class: "7",
      subject: "Art History",
      chapter: "Renaissance Art",
      topic: "Famous Paintings",
      exam: "Art History Exam",
      status:"pending"
    }
  ]);

 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleClickOpen = (data = null) => {
    setDialogData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogData(null);
  };

  const handleOpenAlert = (id) => {
    setDeleteId(id);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    setTableData((prevData) => prevData.filter((item) => item.id !== deleteId));
    handleCloseAlert();
  };

  const handleSubmit = (formData) => {
    if (dialogData) {
      // Update existing item
      setTableData((prevData) =>
        prevData.map((item) => (item.id === dialogData.id ? { ...item, ...formData } : item))
      );
    } else {
      // Add new item
      setTableData((prevData) => [
        ...prevData,
        { id: prevData.length + 1, ...formData },
      ]);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4" >
          <CCardHeader style={{ padding: '10px' }}>
            <CRow>
              <CCol>
                <CIcon icon={cilAddressBook} height={25} />
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Question</strong> <small style={{ fontSize: '17px' }}>List</small>
              </CCol>
              <CCol md="auto">
                <CInputGroup className="mb-3" style={{ width: '200px' }}>
                  <CInputGroupText id="basic-addon1">
                    <CIcon icon={cilSearch} height={17} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="search"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </CInputGroup>
              </CCol>
              <CCol xs lg={2}>
                <CButton color='primary' onClick={() => handleClickOpen()} className='d-flex align-items-center'style={{ padding: '4px 8px' }}>Add Question
                  <CIcon icon={cilPlus} height={16} />
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>

          <Dialog open={openAlert} onClose={handleCloseAlert}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you really want to remove this item? This action is irreversible.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAlert}>Cancel</Button>
              <Button onClick={handleConfirmDelete}>Confirm</Button>
            </DialogActions>
          </Dialog>

          <ExamDialog open={open} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} />

          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Sr.No.</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Question </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Action</CTableHeaderCell>
               
            
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((row, index) => (
                  <CTableRow key={row.id}>
                    <CTableHeaderCell scope="row" style={{ padding: '20px' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableHeaderCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.question}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>
                      <CButton color={row.status === 'Active' ? 'success' : 'warning'} size="sm" style={{ color: 'white' }}>
                        {row.status}
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>
                      <CIcon icon={cilColorBorder} height={20} style={{ marginRight: '30px' }} onClick={() => handleClickOpen(row)} />
                      <CIcon icon={cilTrash} height={20} onClick={() => handleOpenAlert(row.id)} />
                    </CTableDataCell>
                  
                  </CTableRow>
                ))}
              </CTableBody>
              <CTableCaption>List of Exam {tableData.length}</CTableCaption>
            </CTable>

            <CPagination className="justify-content-center" aria-label="Page navigation example">
              <CPaginationItem disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</CPaginationItem>
              <CPaginationItem active>{currentPage}</CPaginationItem>
              <CPaginationItem disabled={currentPage === Math.ceil(tableData.length / itemsPerPage)} onClick={() => handlePageChange(currentPage + 1)}>Next</CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default Question;