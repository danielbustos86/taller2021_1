import React, { useState,useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import MaterialDatatable from "material-datatable";
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Persona() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [rut, setRut] = useState("");
    
    const [data, setData] = useState([]);
    const [accion,setAccion] = useState("Guardar")
    const [id,setId] = useState(null)

    useEffect(() => {

        Listar();
      },[]);



    const classes = useStyles();


    const columns = [

        {
            name: "Sel",
            options: {
              headerNoWrap: true,
              customBodyRender: (item) => {
                return (
                  <Button
                    variant="contained"
                    className="btn-block"
                    onClick={() =>{
                        setNombre(item.nombre)
                        setApellido(item.apellido)
                        setRut(item.rut)
                        setId(item.id)
                        setAccion("Modificar")

                    }}
                  >
                    Seleccionar
                  </Button>
                );
              },
            },
          },
        {
            name: 'Nombre',
            field: 'nombre',
        },
        {
            name: 'Apellido',
            field: 'apellido',
        },
        {
            name: 'Rut',
            field: 'rut',
        },

    ];

    const options = {
        selectableRows:false
    };



    const Listar = () =>{

        axios
            .get(
                `http://192.99.144.232:8080/api/persona`
            )
            .then(
                (response) => {
                    setData(response.data)
             
                },
                (error) => {
             
                }



            );
    }

    const Guardar = () => {


        // alert(nombre);
        // alert(apellido);
        // alert(rut);

      if(accion=="Guardar"){
        axios
        .post(
            `http://192.99.144.232:8080/api/persona`, {
            nombre: nombre,
            apellido: apellido,
            rut: rut
        }
        )
        .then(
            (response) => {
                if (response.status == 200) {
                    //alert("Registro Correcto")
                    Swal.fire({
                        title: 'Perfecto!',
                        text: 'Registro Correcto',
                        icon: 'success',
                        confirmButtonText: 'ok'
                      })
                    Listar();
                    Limpiar();
                }

            },
            (error) => {

                alert("Error al registrar")
            }



        );
      }  
        

      if(accion=="Modificar"){
        axios
        .put(
            `http://192.99.144.232:8080/api/persona/${id}`, {
            nombre: nombre,
            apellido: apellido,
            rut: rut
        }
        )
        .then(
            (response) => {
                if (response.status == 200) {
                    alert("Modificacion correcta")
                    Listar();
                    Limpiar();
                }

            },
            (error) => {

                alert("Error al registrar")
            }



        );
      }

    }

    const Eliminar = () =>{
        axios
        .delete(
            `http://192.99.144.232:8080/api/persona/${id}`
        )
        .then(
            (response) => {
                if (response.status == 200) {
                    alert("Eliminacion correcta")
                    Listar();
                    Limpiar();
                }

            },
            (error) => {

                alert("Error al registrar")
            }



        );
        
    }

    const Limpiar = () =>{
        setNombre("");
        setApellido("");
        setRut("");
        setAccion("Guardar");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registro Persona
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={nombre}
                                onChange={(evt) => {
                                    console.log(evt)
                                    setNombre(evt.target.value)
                                }}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={apellido}
                                onChange={(evt) => {

                                    setApellido(evt.target.value)
                                }}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={rut}
                                onChange={(evt) => {

                                    setRut(evt.target.value)
                                }}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Rut"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>

                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => Guardar()}
                    >
                        {accion}
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={() => Eliminar()}
                    >
                        Eliminar
                    </Button>
                    <Grid container justify="flex-end">
                        <MaterialDatatable
                            title={"Employee List"}
                            data={data}
                            columns={columns}
                            options={options}
                        />


                    </Grid>
                </form>
            </div>

        </Container>
    );
}