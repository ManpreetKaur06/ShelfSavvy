import React, { useState, useEffect } from "react"
import * as dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { useParams, useNavigate } from "react-router-dom"
import {
  Paper,
  Container,
  Button,
  TextField,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material"
import { BackendApi } from "../../client/backend-api"
import classes from "./styles.module.css"

dayjs.extend(utc)

export const StudentForm = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    password: "",
    department: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    password: "",
    department: "",
  })

  const isInvalid =
    user.name.trim() === "" || user.password.trim() === "" || user.department.trim() === ""

  const formSubmit = (event) => {
    event.preventDefault()
    if (!isInvalid) {
      BackendApi.user.createUser(
       user.name, 
       user.password,
       user.department)
        .then(() => navigate("/"))

    //   BackendApi.book
    //       .addBook({
    //           ...book,
    //           priceHistory: [{ price: book.price, modifiedAt: dayjs().utc().format() }],
    //           quantityHistory: [{ quantity: book.quantity, modifiedAt: dayjs().utc().format() }],
    //       })
    //       .then(() => navigate("/"))
    }
  }

  const validateForm = (event) => {
    const { name, value } = event.target
    if (["name", "password", "department"].includes(name)) {
      setUser((prevProd) => ({ ...prevProd, [name]: value.trim() }))
      if (!value.trim().length) {
        setErrors({ ...errors, [name]: `${name} can't be empty` })
      } else {
        setErrors({ ...errors, [name]: "" })
      }
    }
  }

  const updateUserField = (event) => {
    const field = event.target
    setUser((user) => ({ ...user, [field.name]: field.value }))
}

  // useEffect(() => {
  //     if (bookIsbn) {
  //         BackendApi.book.getBookByIsbn(bookIsbn).then(({ book, error }) => {
  //             if (error) {
  //                 navigate("/")
  //             } else {
  //                 setBook(book)
  //             }
  //         })
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [bookIsbn])

  return (
    <>
      <Container component={Paper} className={classes.wrapper}>
        <Typography className={classes.pageHeader} variant="h5">
          {"Add User"}
        </Typography>
        <form noValidate autoComplete="off" onSubmit={formSubmit}>
          <FormGroup>
            <FormControl className={classes.mb2}>
              <TextField
                label="Name"
                name="name"
                required
                value={user.name}
                onChange={updateUserField}
                onBlur={validateForm}
                error={errors.name.length > 0}
                helperText={errors.name}
              />
            </FormControl>
            <FormControl className={classes.mb2}>
              <TextField
                label="Password"
                name="password"
                required
                value={user.password}
                onChange={updateUserField}
                onBlur={validateForm}
                error={errors.password.length > 0}
                helperText={errors.password}
              />
            </FormControl>
            <FormControl className={classes.mb2}>
              <InputLabel>Department</InputLabel>
              <Select
                name="department"
                value={user.department}
                 onChange={updateUserField}
                required
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="guest">User</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <div className={classes.btnContainer}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate(-1)
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={isInvalid}>
              {"Add User"}
            </Button>
          </div>
        </form>
      </Container>
    </>
  )
}
