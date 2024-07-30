import React, { useState, useEffect } from 'react'
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
  Grid,
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

const StyledHeading = styled(Box)(({ theme }) => ({
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

const ExamDialog = ({ open, handleClose, initialData, handleSubmit, setFormData, formData, getData, setdata, data, currentPage }) => {

 
  const [classData, setClassData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [classLoading, setClassLoading] = useState(false);
  const [subjectLoading, setSubjectLoading] = useState(false);
  const [chapterLoading, setChapterLoading] = useState(false);

  useEffect(() => {
    if (open) {
      getClass();
    }
  }, [open]);

  const teacherId = 2;

  const getClass = async () => {
    const url = `http://localhost:3000/api/admin/teacher/${teacherId}/class`;
    setClassLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const json = await response.json();
        setClassData(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setClassLoading(false);
    }
  };

  const getSubject = async (classId) => {
    const url = `http://localhost:3000/api/admin/teacher/${classId}/subjects`;
    setSubjectLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const json = await response.json();
        setSubjectData(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubjectLoading(false);
    }
  };
  const getChapter = async (subjectId) => {
    const url = `http://localhost:3000/api/admin/teacher/${subjectId}/chapters`;
    setChapterLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const json = await response.json();
        setChapterData(json.data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setChapterLoading(false);
    }
  };
  const handleSubjectChange = (event) => {
    const selectedSubjectId = event.target.value;
    setFormData(prevData => ({
      ...prevData,
      subjectId: selectedSubjectId,
      chapterId: '', // Reset chapter when subject changes
    }));
    getChapter(selectedSubjectId);
  };

  const handleClassChange = (event) => {
    const selectedClassId = event.target.value;
    setFormData(prevData => ({
      ...prevData,
      classId: selectedClassId,
      subjectId: '', // Reset subject when class changes
    }));
    getSubject(selectedClassId);
  };

  // useEffect(() => {
  //   if (initialData) {
  //     setFormData({
  //       ...initialData,
  //       correctOption: initialData.correctOption || []
  //     });
  //   }
  // }, [initialData]);

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
    getData(currentPage);
    handleClose();
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
                  name="classId"
                  value={formData.classId}
                  onChange={handleClassChange}
                  label="Select Class"
                >
                  <MenuItem  disabled><em>-- Select Class --</em></MenuItem>


                  {!classLoading ? (
                    classData && classData.length > 0 ? (
                      classData.map((i) => (
                        <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No classes available</MenuItem>
                    )
                  ) : (
                    <MenuItem disabled>Loading...</MenuItem>
                  )}
                </Select>
              </StyledFormControl>
            </Grid>


            <Grid item xs={4}>
              <FormControl fullWidth required>
              <InputLabel id="subject-label">Select Subject</InputLabel>
                <Select
                  labelId="subject-label"
                  name="subjectId"
                  value={formData.subjectId}
                  onChange={handleSubjectChange}
                  label="Select Subject"
                  disabled={!formData.classId}
                >
                  <MenuItem value="" disabled><em>-- Select Subject --</em></MenuItem>
                  {!subjectLoading ? (
                    subjectData.length > 0 ? (
                      subjectData.map((i) => (
                        <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No subjects available</MenuItem>
                    )
                  ) : (
                    <MenuItem disabled>Loading...</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* chapter */}
            <Grid item xs={4}>
              <FormControl fullWidth required>
              <InputLabel id="chapter-label">Select Chapter</InputLabel>
                <Select
                  labelId="chapter-label"
                  name="chapterId"
                  value={formData.chapterId}
                  onChange={handleChange}
                  label="Select Chapter"
                  disabled={!formData.subjectId}
                >
                  <MenuItem value="" disabled><em>-- Select Chapter --</em></MenuItem>
                  {!chapterLoading ? (
                    chapterData.length > 0 ? (
                      chapterData.map((i) => (
                        <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No chapters available</MenuItem>
                    )
                  ) : (
                    <MenuItem disabled>Loading...</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {/* topics */}
          
          {/* <Grid container spacing={3}>
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
                
                </Select>
              </FormControl>
            </Grid>




          </Grid> */}



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


          <Typography variant="subtitle1" sx={{ margin: '10px 0' }}>Write Question:</Typography>
          <CKEditor editorUrl="https://cdn.ckeditor.com/4.18.0/standard-all/ckeditor.js" />


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
          <CKEditor />
          <Typography variant="subtitle1">Solution</Typography>
          <CKEditor />
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
  const [data, setData] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const [formData, setFormData] = useState({
    classId: '',
    subjectId: '',
    chapterId: '',
    teacherId: '',
    targetExams: '',
    difficulty: '',
    duration: '',
    e_question: '',
    solution: '',
    options: [],
  });
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsInRpbWUiOjE3MjE5MTIyNzc2ODcsImlhdCI6MTcyMTkxMjI3N30.b5aUEQDTc84g2CEP1DQA32zd5NRP31F-uOEq_7fJsX4`

  const getData = async (currentPage, teacherId = 1) => {
    console.log('page', currentPage)
    const url = `http://localhost:3000/api/admin/teacher/${teacherId}/questions?page=${currentPage}`; // Replace with your API endpoint
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setLoading(false);
        // console.log(json.totalRecords);
        setTotalPages(json.totalPages)
        setTotalRecords(json.totalRecords);

        console.log("json", json.questions.data);
        setData(json.questions.data); // Update state with response data
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const searchData = async (searchQuery, teacherId = 1) => {
    const url = `http://localhost:3000/api/admin/teacher/${teacherId}/questions?search=${encodeURIComponent(searchQuery)}`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setData(json.questions.data); // Directly set the data without pagination
        setLoading(false);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };




  const handleDeleteRole = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/teacher/question/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        console.log('Role deleted:', id);
        getData(currentPage)
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting role:', error.message);
    }
  };



  const handleOpenAlert = (id) => {
    setDeleteId(id);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteRole(deleteId);
    handleCloseAlert();
  };


  const handleAddRole = async (formData) => {
    const { classId, subjectId, chapterId, teacherId, targetExams, difficulty, duration, e_question, solution, options } = formData;

    try {
      const response = await fetch('http://localhost:3000/api/admin/teacher/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ classId, subjectId, chapterId, teacherId, targetExams, difficulty, duration, e_question, solution, options }),
      });

      if (response.ok) {
        const result = await response.json();
        setData((prevData) => [...prevData, result]); // Assuming the API returns the new role in result.data
        console.log('Role added:', result, "formData", formData);

        setFormData('')
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding role:', error.message);
    }
  };
  const handleEditRole = async (id, formData) => {
    const { classId, subjectId, chapterId, teacherId, targetExams, difficulty, duration, e_question, solution, options } = formData;

    try {
      const response = await fetch(`http://localhost:3000/api/admin/userRole/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ classId, subjectId, chapterId, teacherId, targetExams, difficulty, duration, e_question, solution, options }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("current page in edit", currentPage)

        // setData((prevData) =>
        //   prevData.map((item) => (item.id === id ? result : item))
        // );
        setData((prevData) => [...prevData, result]);
        console.log('Role updated:', result);
        getData(currentPage)
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating role:', error.message);
    }
  };


  const handleSubmit = async (formData) => {
    console.log("formdata in handlesubmit", formData, "dialogData", dialogData)
    if (dialogData) {
      console.log('handleEditRole')
      await handleEditRole(dialogData.id, formData);

    } else {
      console.log('handleAddRole')
      await handleAddRole(formData);
    }
    handleClose(); // Close the dialog after submission
  };

  const handleClickOpen = (data = null) => {
    setDialogData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogData(null);
  };

  const handlePageChange = (newPage) => {
    console.log("newPage in handlePAge Changne", newPage)
    setCurrentPage(newPage);
    getData(newPage)
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    searchData(search)

  };


  const itemsPerPage = 10;



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
                    value={search}
                    onChange={handleSearch}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs lg={2}>
                <CButton color='primary' onClick={() => handleClickOpen()} className='d-flex align-items-center' style={{ padding: '4px 8px' }}>Add Question
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

          <ExamDialog open={open} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} setdata={setData} data={data} getData={getData} currentPage={currentPage} />
          {!loading ? (
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
                  {data.map((row, index) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row" style={{ padding: '20px' }}>  {(currentPage - 1) * itemsPerPage + index + 1}</CTableHeaderCell>
                      <CTableDataCell style={{ padding: '20px' }}>{row.e_question}</CTableDataCell>
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
                <CTableCaption>List of Exam {totalRecords}</CTableCaption>
              </CTable>

              <CPagination className="justify-content-center" aria-label="Page navigation example">
                <CPaginationItem disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</CPaginationItem>
                <CPaginationItem active>{currentPage}</CPaginationItem>
                <CPaginationItem disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</CPaginationItem>
              </CPagination>
            </CCardBody>
          ) : (
            <div>Loading...</div>
          )}
        </CCard>
      </CCol>
    </CRow>
  );
}

export default Question;