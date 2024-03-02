//App en ES5 en
const express = require('express');
const bodyParser = require('body-parser');
//Puerto
let PORT = 8080;

let libros = [
    {
        id: 1,
        title: 'Libro 1',
        autor: 'Autor 1',
        year: 2020
    },
    {
        id: 2,
        title: 'Libro 2',
        autor: 'Autor 2',
        year: 2021
    },
    {
        id: 3,
        title: 'Libro 3',
        autor: 'Autor 3',
        year: 2022
    }
]

//CRUD

//instanciamos una app de express
const app = express();

//uso de bodyParser para leer form
app.use(bodyParser.urlencoded({ extended: true }));

//peticion de index
app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/public/pages/index.html');
});

//pide los libros
app.get('/libros', (req, res) => {
    res.status(200).send(libros);
});

//pide un libro
app.get('/libros/:id', (req, res) => {
    let libro = libros.filter(libro => libro.id == req.params.id);
    res.status(200).send(libro && libro[0] ? libro[0] : 'Libro no encontrado');
});

//crea un libro
app.post('/libros', (req, res) => {
    libros[libros.length] = {
        id: libros.length + 1,
        ...req.body
    }
    res.status(200).send('Libro creado');
});

//actualizacion de un libro
app.put('/libros/:id', (req, res) => {
    let libroActualizado = false;
    libros = libros.map(libro => {
        try {
            if(libro.id == parseInt(req.params.id)){
                libro.title = req.body.title ? req.body.title : libro.title;
                libro.autor = req.body.autor ? req.body.autor : libro.autor;
                libro.year = req.body.year ? req.body.year : libro.year;
                libroActualizado = true;
            }
        } finally {
            return libro;
        }
    });
    res.status(200).send(libroActualizado ? 'Libro actualizado' : 'Libro no encontrado');
});

//eliminacion de libro
app.delete('/libros/:id', (req, res) => {
    
    let libroEliminado = false;
    let libroEncontrado;
    libros = libros.filter(libro => {
        try {
            libroEncontrado = false;
            if(libro.id == parseInt(req.params.id)){
                libroEliminado = true;
                libroEncontrado = true;
            }
        }finally {
            return !libroEncontrado;
        }
    });
    res.status(200).send(libroEliminado ? 'Libro eliminado' : 'Libro no encontrado');
});

//Levantamos el server
app.listen(PORT, () => {
    console.log(`Server trabajando en http://localhost:${PORT}`);
})