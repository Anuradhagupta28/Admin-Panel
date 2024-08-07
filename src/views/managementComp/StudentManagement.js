import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
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
  CImage
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAddressBook, cilTrash, cilColorBorder, cilSearch, cilPlus } from '@coreui/icons'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
  Select
} from '@mui/material';

const ExamDialog = ({ open, handleClose, initialData, handleSubmit, setFormData, formData, getData, currentPage }) => {
  console.log("initialData", initialData, 'formData', formData);

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        class: '',
        target_exam: '',
        subscription: '',
        studentImage: '',
        status: 1,
      });
    }
  }, [initialData, setFormData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => {
      const accessArray = (prevData.access || '').split(',').filter(Boolean);
      if (checked) {
        accessArray.push(name);
      } else {
        const index = accessArray.indexOf(name);
        if (index > -1) {
          accessArray.splice(index, 1);
        }
      }
      return {
        ...prevData,
        access: accessArray.join(','),
      };
    });
  };

  const onSubmit = async () => {
    await handleSubmit(formData);
    getData(currentPage);
    handleClose();
  };

  const isChecked = (name) => {
    return formData.access ? formData.access.split(',').includes(name) : false;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Class Form</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="class"
          label="Class *"
          type="text"
          fullWidth
          value={formData.class}
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
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="0">Pending</MenuItem>
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



const StudentManagements = () => {

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
    name: '',
    email: '',
    phone: '',
    location: '',
    class: '',
    target_exam: '',
    subscription: '',
    studentImage: '',
    status: '',
  });
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [planType, setPlanType] = useState('Monthly');
  const [studentId, setStudentId] = useState('');
  const [activeStudent, setActiveStudent] = useState(null);
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsInRpbWUiOjE3MjE5MTIyNzc2ODcsImlhdCI6MTcyMTkxMjI3N30.b5aUEQDTc84g2CEP1DQA32zd5NRP31F-uOEq_7fJsX4`

  const handleSubscriptionOpen = () => setSubscriptionDialogOpen(true);

  const handleSubscriptionClose = () => setSubscriptionDialogOpen(false);

  const handleDeactivateOpen = (student) => {
    setActiveStudent(student);
    setDeactivateDialogOpen(true);
  };
  const handleDeactivateClose = () => setDeactivateDialogOpen(false);

  const handlePlanChange = (event) => setPlanType(event.target.value);

  const handleDeactivate = async () => {
    if (!activeStudent) return;

    const newStatus = activeStudent.status === 1 ? 0 : 1;

    try {
      const response = await fetch(`https://dev-api.solvedudar.com/api/admin/student-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentId: activeStudent.id,
          status: newStatus
        }),
      });

      if (response.ok) {
        const result = await response.json();

        // Update the local data
        setData((prevData) =>
          prevData.map((item) =>
            item.id === activeStudent.id ? { ...item, status: newStatus } : item
          )
        );

        console.log('Student status updated:', result);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating student status:', error);
    }
    handleDeactivateClose();
  };

  const getData = async (currentPage) => {

    setLoading(true); // Set loading to true before making the request
    const url = `https://dev-api.solvedudar.com/api/admin/student/data?page=${currentPage}`; // Replace with your API endpoint

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

        setTotalPages(json.students.totalPages);
        setTotalRecords(json.students.totalRecords);
        setData(json.students.data); // Update state with response data

      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const searchData = async (searchQuery) => {


    const url = `https://dev-api.solvedudar.com/api/admin/student/data?search=${encodeURIComponent(searchQuery)}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
l
      if (response.ok) {
        const json = await response.json();
        setData(json.students.data);
        setLoading(false);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  const debouncedFetchData = useCallback(debounce((query) => {
    searchData(query);
  }, 500), []); // 300ms debounce time

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    debouncedFetchData(value);
  };
  const handleDeleteRole = async (id) => {
    try {
      const response = await fetch(`https://dev-api.solvedudar.com/api/admin/class/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id));

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
    // await handleDeleteRole(deleteId);
    handleCloseAlert();
  };


  const handleAddRole = async (formData) => {
    const { class: className, status } = formData; // Destructure class as className



    try {
      const response = await fetch('https://dev-api.solvedudar.com/api/admin/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ className, status }), // Correct JSON structure
      });

      if (response.ok) {
        const result = await response.json();
        setData((prevData) => [...prevData, result]); // Assuming the API returns the new role in result


        setFormData({ class: '', status: 1 }); // Clear form data
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding role:', error.message);
    }
  };

  const handleEditRole = async (id, formData) => {
    const { class: className, status } = formData;

    try {
      const response = await fetch(`https://dev-api.solvedudar.com/api/admin/class`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id, className, status }), // Ensure proper formatting
      });

      if (response.ok) {
        const result = await response.json();


        // Update the data properly
        setData((prevData) =>
          prevData.map((item) => (item.id === id ? result : item))
        );


        getData(currentPage);
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
      // await handleAddRole(formData);
    }
    handleClose();
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

    setCurrentPage(newPage);
    getData(newPage)
  };
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
    searchData(search)

  };

  const itemsPerPage = 10;
  console.log("loading", loading, "data", data)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ padding: '10px' }}>
            <CRow >
              <CCol>
                <CIcon icon={cilAddressBook} height={25} />
                <strong style={{ marginLeft: '18px', fontSize: '25px' }}>Student</strong> <small style={{ fontSize: '17px' }}>List</small>
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
                    onChange={handleSearchChange}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs lg={1}>
                <CButton color='secondary' onClick={() => handleClickOpen()} className='d-flex align-items-center' style={{ padding: '4px 8px' }}>Add
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

          {/* <ExamDialog open={open} handleClose={handleClose} initialData={dialogData} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} setdata={setData} data={data} getData={getData} currentPage={currentPage} /> */}


          {!loading ? (
            <CCardBody style={{ maxwidth: '100%', overflowX: 'auto' }}>
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Sr.No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Phone</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>City</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Exam Planning For</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Subscription</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Phone Verify</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col" style={{ padding: '20px', whiteSpace: 'nowrap' }}>Action</CTableHeaderCell>

                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((row, index) => (
                    <CTableRow key={row.id}>
                      <CTableHeaderCell scope="row" style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        {(currentPage - 1) * itemsPerPage + index + 1}

                      </CTableHeaderCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.name}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.email}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.phone}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }} >
                        <CImage rounded thumbnail src={row.studentImage} width={80} height={80} />

                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.location}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.class}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>{row.target_exam}</CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <CButton color='secondary' className='d-flex align-items-center' style={{ padding: '4px 8px' }} onClick={handleSubscriptionOpen}>Add

                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <CButton color="success" active='active' size="sm" style={{ color: 'white' }}> verified</CButton>
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <CButton
                          color={row.status === 1 ? 'success' : 'danger'}
                          size="sm"
                          style={{ color: 'white' }}
                          onClick={() => handleDeactivateOpen(row)}
                        >
                          {row.status === 1 ? 'Active' : 'Deactivate'}
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell style={{ padding: '20px', whiteSpace: 'nowrap' }}>
                        <CIcon icon={cilColorBorder} height={20} style={{ marginRight: '30px' }} onClick={() => handleClickOpen(row)} />
                        <CIcon icon={cilTrash} height={20} onClick={() => handleOpenAlert(row.id)} />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
                <CTableCaption>Showing 1 to 10 of {totalRecords} entries</CTableCaption>
              </CTable>
              {/* dialog box for Subscription plan */}
              <Dialog open={subscriptionDialogOpen} onClose={handleSubscriptionClose} 
               PaperProps={{
                style: {
                  width: '500px', // Set the fixed width you want here
                  maxWidth: '500px', // Ensure the max-width does not override your width
                },
              }}>
                <DialogTitle>Subscription Plan</DialogTitle>
                <DialogContent>
                  <Select value={planType} onChange={handlePlanChange} style={{ width: '100%' }}>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                    <MenuItem value="Annually">Annually</MenuItem>
                    <MenuItem value="Half-yearly">Half-yearly</MenuItem>
                  </Select>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSubscriptionClose}>Close</Button>
                  <Button onClick={handleSubscriptionClose} color="primary">Save</Button>
                </DialogActions>
              </Dialog>

              {/* dialog box for deactivate  */}
              <Dialog open={deactivateDialogOpen} onClose={handleDeactivateClose}>
                <DialogTitle>Do you want to deactivate this student?</DialogTitle>
                <DialogActions>
                  <Button onClick={handleDeactivate} color="primary">Yes</Button>
                  <Button onClick={handleDeactivateClose}>No</Button>
                </DialogActions>
              </Dialog>

              <CPagination className="justify-content-center" aria-label="Page navigation example">
                <CPaginationItem disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</CPaginationItem>
                {pageNumbers.map((number) => (
                  <CPaginationItem
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </CPaginationItem>
                ))}
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

export default StudentManagements;
