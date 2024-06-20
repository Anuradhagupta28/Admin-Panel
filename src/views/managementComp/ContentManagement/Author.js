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
        examName: '',
        description: '',
        passingPercentage: '',
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

const Author = () => {
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    examName: '',
    description: '',
    passingPercentage: '',
    status: '',
  });

  const tableData = [
    {
      id: 1,
      examName: 'X',
      subject: 'MATHS',
      author: 'NCERT',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 2,
      examName: 'VI',
      subject: 'MATHS',
      author: 'R.D.SHARMA',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 3,
      examName: 'VI',
      subject: 'MATHS',
      author: 'R.S.AGARWAL',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 4,
      examName: 'VI',
      subject: 'MATHS',
      author: 'OTHER',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 5,
      examName: 'VI',
      subject: 'SCIENCE',
      author: 'NCERT',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 6,
      examName: 'VI',
      subject: 'SCIENCE',
      author: 'OTHER',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 7,
      examName: 'VII',
      subject: 'MATHS',
      author: 'NCERT',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 8,
      examName: 'VII',
      subject: 'MATHS',
      author: 'R.D.SHARMA',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 9,
      examName: 'VII',
      subject: 'MATHS',
      author: 'R.S.AGARWAL',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 10,
      examName: 'VII',
      subject: 'MATHS',
      author: 'OTHER',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 11,
      examName: 'VII',
      subject: 'SCIENCE',
      author: 'NCERT',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 12,
      examName: 'VII',
      subject: 'SCIENCE',
      author: 'OTHER',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 13,
      examName: 'VIII',
      subject: 'MATHS',
      author: 'NCERT',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 14,
      examName: 'VIII',
      subject: 'MATHS',
      author: 'R.D.SHARMA',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 15,
      examName: 'VIII',
      subject: 'MATHS',
      author: 'R.S.AGARWAL',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 16,
      examName: 'VIII',
      subject: 'MATHS',
      author: 'OTHER',
      description: 'NONE',
      status: 'Active'
    },
    {
      id: 17,
      examName: 'VIII',
      subject: 'SCIENCE',
      author: 'NCERT',
      description: 'NONE',
      status: 'Active'
    }
  ];
  
  
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
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Exam</strong> <small style={{ fontSize: '17px' }}>List</small>
              </CCol>

              <CCol>
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
                <CCardText onClick={() => handleClickOpen()}>Add
                  <CIcon icon={cilPlus} height={18} />
                </CCardText>
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
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Exam </CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Subject</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={{ padding: '20px' }}>Author</CTableHeaderCell>
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
                    <CTableDataCell style={{ padding: '20px' }}>{row.subject}</CTableDataCell>
                    <CTableDataCell style={{ padding: '20px' }}>{row.author}</CTableDataCell>
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

export default Author;
