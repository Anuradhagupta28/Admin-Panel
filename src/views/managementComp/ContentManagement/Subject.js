import React, { useState } from 'react'
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
  CCardText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAddressBook, cilTrash, cilColorBorder, cilSearch, cilPlus } from '@coreui/icons'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const ExamDialog = ({ open, handleClose, initialData, handleSubmit, setFormData, formData }) => {

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        examName: '',
        subjectName: '',
        description: '',
       
        status: '',
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = () => {
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Exam Form</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="examName"
          label="Exam Name *"
          select
          fullWidth
          value={formData.examName}
          onChange={handleChange}
        >
          {['VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'NEET', 'JEE Main', 'JEE Advanced', 'Other Exams'].map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="subjectName"
          label="Subject Name *"
          select
          fullWidth
          value={formData.subjectName}
          onChange={handleChange}
        >
          {['Maths', 'Biology', 'Chemistry', 'Physics', 'English', 'History', 'Geography', 'Other'].map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="description"
          label="Description *"
          type="text"
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
        
        <TextField
          margin="dense"
          name="status"
          label="Status"
          select
          fullWidth
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};



const Subject = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    examName: '',
    subjectName:'',
    description: '',
   
    status: '',
  });

  const [tableData, setTableData] = useState([
    {
      id: 1,
      examName: 'X-SCIENCE',
      subjectName: 'BIOLOGY',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 2,
      examName: 'X-SCIENCE',
      subjectName: 'CHEMISTRY',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 3,
      examName: 'X-SCIENCE',
      subjectName: 'PHYSICS',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 4,
      examName: 'IX-SCIENCE',
      subjectName: 'BIOLOGY',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 5,
      examName: 'IX-SCIENCE',
      subjectName: 'CHEMISTRY',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 6,
      examName: 'IX-SCIENCE',
      subjectName: 'PHYSICS',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 7,
      examName: 'VIII',
      subjectName: 'BIOLOGY',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 8,
      examName: 'VIII',
      subjectName: 'BIOLOGY',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 9,
      examName: 'VIII',
      subjectName: 'BIOLOGY',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 10,
      examName: 'VIII',
      subjectName: 'BIOLOGY',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 11,
      examName: 'VIII',
      subjectName: 'BIOLOGY',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 12,
      examName: 'VIII',
      subjectName: 'BIOLOGY',
      description: 'NONE',
      status: 'Active'
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
        <CCard className="mb-4">
          <CCardHeader style={{ padding: '10px' }}>
            <CRow >
              <CCol>
                <CIcon icon={cilAddressBook} height={25} />
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Subject</strong> <small style={{ fontSize: '17px' }}>List</small>
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
              <CCol xs lg={1}>
                <CButton color='secondary' onClick={() => handleClickOpen()} className='pt-1 pb-1'>Add
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
              <Button onClick={handleConfirmDelete} >Confirm</Button>
            </DialogActions>
          </Dialog>

          <ExamDialog open={open} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData}  formData={formData}/>

          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Sr.No.</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Exam Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Subject Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Description</CTableHeaderCell>
                 
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((row, index) => (
                  <CTableRow key={row.id}>
                    <CTableHeaderCell scope="row" style={{ padding: '20px' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableHeaderCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.examName}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.subjectName}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.description}</CTableDataCell>
                    
                    <CTableDataCell style={{ padding: '20px' }}>
                      <CButton color={row.status === 'Active' ? 'success' : 'danger'} size="sm" style={{ color: 'white' }}>
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

export default Subject;
