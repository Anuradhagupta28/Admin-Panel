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


const ExamDialog = ({ open, handleClose, initialData, handleSubmit,setFormData,formData }) => {


  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        role: '',
        access: '',
        action: '',
        url: '',
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
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '500px' } }}>
      <DialogTitle>Add Menu</DialogTitle>
      <DialogContent>
        <TextField
          
          margin="dense"
          name="role"
          label="Select Role*"
          type="text"
          fullWidth
          select
          value={formData.role}
          onChange={handleChange}
          >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="subadmin">Sub Admin</MenuItem>
          <MenuItem value="staff">Staff</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
        </TextField>
        <TextField

          margin="dense"
          name="menu"
          label="Select Menu *"
          type="text"
          fullWidth
          select
          value={formData.menu}
          onChange={handleChange}
          >
          <MenuItem value="content">Content</MenuItem>
          <MenuItem value="role">Role</MenuItem>
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
        </TextField>
        <TextField
        
          margin="dense"
          name="submenu"
          label="Select Submenu*"
          type="number"
          fullWidth
       select
          value={formData.submenu}
          onChange={handleChange}
          >
          <MenuItem value="admin/exam">Admin/Exam</MenuItem>
          <MenuItem value="admin/class">Admin/Class</MenuItem>
          <MenuItem value="admin/student">Admin/Student</MenuItem>
          <MenuItem value="admin/teacher">Admin/Teacher</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          name="url"
          label="URL *"
          type="text"
          fullWidth
          value={formData.url}
          onChange={handleChange}
        />
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

const MenuPermission = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    role: '',
    access: '',
    action: '',
    url: '',
   
  });


 

  const [tableData, setTableData] = useState([
    {
      id: 1,
      role: 'sub admin',
      menu: 'Teacher Management',
      submenu: 'admin/teacher',
      url: 'path/to/teacher-management'
    },
    {
      id: 2,
      role: 'admin',
      menu: 'Student Management',
      submenu: 'admin/student',
      url: 'path/to/student-management'
    },
    {
      id: 3,
      role: 'sub admin',
      menu: 'Class Management',
      submenu: 'admin/class',
      url: 'path/to/class-management'
    },
    {
      id: 4,
      role: 'admin',
      menu: 'Exam Management',
      submenu: 'admin/exam',
      url: 'path/to/exam-management'
    },
    {
      id: 5,
      role: 'teacher',
      menu: 'Assignment Management',
      submenu: 'teacher/assignment',
      url: 'path/to/assignment-management'
    },
    {
      id: 6,
      role: 'admin',
      menu: 'Library Management',
      submenu: 'admin/library',
      url: 'path/to/library-management'
    },
    {
      id: 7,
      role: 'sub admin',
      menu: 'Attendance Management',
      submenu: 'admin/attendance',
      url: 'path/to/attendance-management'
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
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Menu </strong> <small style={{ fontSize: '17px' }}>List</small>
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
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Role</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Menu</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Submenu</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Url</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((row, index) => (
                  <CTableRow key={row.id}>
                    <CTableHeaderCell scope="row" style={{ padding: '20px' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableHeaderCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.role}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.menu}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.submenu}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.url}</CTableDataCell>
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

export default MenuPermission;
