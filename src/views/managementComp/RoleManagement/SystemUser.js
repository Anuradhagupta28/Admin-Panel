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
  CImage,
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
        exam: '',
        email: '',
        phoneNo: '',
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
          type="text"
          fullWidth
          value={formData.examName}
          onChange={handleChange}
        />
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
          name="passingPercentage"
          label="Passing Percentage *"
          type="number"
          fullWidth
          value={formData.passingPercentage}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="status"
          label="Status"
          type="text"
          fullWidth
          select
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

const SystemUser = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    role: '',
    exam: '',
    email: '',
    phoneNo: '',
    status: '',
  });

  const [tableData, setTableData] = useState([
    {
      id: 1,
      role: 'admin',
      exam: 'Admin',
      email: 'solvedudar@gmail.com',
      phoneNo: '7800151777',
      status: 'Active'
    },
    {
      id: 2,
      role: 'teacher',
      exam: 'Sandeep Kumar Singh',
      email: 'singhsandeep3137@gmail.com',
      phoneNo: '8010161320',
      status: 'Active'
    },
    {
      id: 3,
      role: 'teacher',
      exam: 'Devraj Singh',
      email: 'devrajsingh86313@gmail.com',
      phoneNo: '7905341307',
      status: 'Active'
    },
    {
      id: 4,
      role: 'teacher',
      exam: 'Saket Jha',
      email: 'saketjha2020@gmail.com',
      phoneNo: '9821708922',
      status: 'Active'
    },
    {
      id: 5,
      role: 'teacher',
      exam: 'Varun Upadhyay',
      email: 'vvekraiji@gmail.com',
      phoneNo: '7086887291',
      status: 'Active'
    },
    {
      id: 6,
      role: 'teacher',
      exam: 'Amit Sharma',
      email: 'amitsharma@gmail.com',
      phoneNo: '9801234567',
      status: 'Active'
    },
    {
      id: 7,
      role: 'teacher',
      exam: 'Ravi Kumar',
      email: 'ravikumar@gmail.com',
      phoneNo: '9812345678',
      status: 'Inactive'
    },
    {
      id: 8,
      role: 'teacher',
      exam: 'Neha Gupta',
      email: 'nehagupta@gmail.com',
      phoneNo: '9876543210',
      status: 'Active'
    },
    {
      id: 9,
      role: 'teacher',
      exam: 'Anil Mehta',
      email: 'anilmehta@gmail.com',
      phoneNo: '9123456780',
      status: 'Active'
    },
    {
      id: 10,
      role: 'teacher',
      exam: 'Priya Verma',
      email: 'priyaverma@gmail.com',
      phoneNo: '9234567891',
      status: 'Inactive'
    },
    {
      id: 11,
      role: 'teacher',
      exam: 'Kiran Rao',
      email: 'kiranrao@gmail.com',
      phoneNo: '9345678901',
      status: 'Active'
    },
    {
      id: 12,
      role: 'teacher',
      exam: 'Vikas Patil',
      email: 'vikaspatil@gmail.com',
      phoneNo: '9456789012',
      status: 'Inactive'
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
      <CCol xs={12} >
        <CCard className="mb-4" style={{ width: '90rem', marginLeft:'-5rem'}}> 
          <CCardHeader style={{ padding: '10px' }}>
            <CRow >
              <CCol>
                <CIcon icon={cilAddressBook} height={25} />
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>System user</strong> <small style={{ fontSize: '17px' }}>List</small>
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
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Role </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Exam </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Email </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>phone No.</CTableHeaderCell>
                
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Profile Pic</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((row, index) => (
                  <CTableRow key={row.id}>
                    <CTableHeaderCell scope="row" style={{ padding: '20px' }}>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableHeaderCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.role}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.exam}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.email}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.phoneNo}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>
                      <CButton color={row.status === 'Active' ? 'success' : 'danger'} size="sm" style={{ color: 'white' }}>
                        {row.status}
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>
                    <CImage rounded thumbnail src="https://dev-v1.solvedudar.com/assets/master/profile/default.png" width={100} height={100} />
                
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

export default SystemUser;
