const express = require('express');
const bodyParser = require('body-parser');

const amazonS3 = require('./s3Service.js');

const multer  =   require('multer');
const upload = multer();

const Bcrypt = require('bcrypt');
const { server } = require('./config/credentials');

const db = require('./config/db');

const app = () => {
  const expressApp = express();
  expressApp.use(bodyParser.urlencoded({ extended: true }));
  expressApp.use(bodyParser.json());



//addUsuario


  expressApp.post('/addUsuario', (req, res) => {

// console.log(req.body);
    //var password = req.body.pass;
   // var salt = Bcrypt.genSaltSync();
   // console.log(password+'-'+ salt);
    //var encryptedPassword = Bcrypt.hashSync(password, salt);
    //,[req.body.email, req.body.pass,req.body.nombre,req.body.telefono]


    db(`INSERT INTO usuarios (email, pass, nombre, telefono) 
        VALUES (?,?,?,?)
        `,[req.body.email, req.body.pass,req.body.nombre,req.body.telefono])
      .then((data) => {
        console.log(data);
        if (!data) {res.send().status(500);}
        return res.send({ insertId: data.insertId });
      }).catch(err => res.send(err).status(500));
  });



  expressApp.post('/doLogin', (req, res) => {
    db(`SELECT  idUsuario
        FROM usuarios 
        WHERE email = ? AND pass = ?
    `,[req.body.email, req.body.pass]).then((data) => {
      if (!data) res.send().status(500);
      return res.send({
        idUsuario: data[0].idUsuario,
        });
    }).catch(err => res.send(err).status(500));
  });


  expressApp.post('/recuperar', (req, res) => {

    
    var nueva = Math.random().toString(36).substr(2, 8);
    var password = nueva;
    var salt = Bcrypt.genSaltSync();
    var encryptedPassword = Bcrypt.hashSync(password, salt);


    db(`UPDATE usuarios SET pass = ? WHERE email=?
        `,[encryptedPassword, req.body.email])
      .then((data) => {
        if (!data) res.send().status(500);
        return res.send({ data: data });
      }).catch(err => res.send(err).status(500));
  });





  // PublicationRoute
  expressApp.post('/getPublicaciones', (req, res) => {
    db(`SELECT *, 
        (SELECT i.urlImagen 
        FROM imagenesPublicaciones as i 
        WHERE i.idPublicacion = p.idPublicacion 
        ORDER BY i.fechaCreacion ASC LIMIT 1) as imagenUrl 
        FROM publicaciones as p 
        WHERE estadoPublicacion = 1
    `).then((data) => {
      if (!data) res.send().status(500);
      return res.send(data.map(d => ({
        idPublicacion: d.idPublicacion,
        idUsuario: d.idUsuario,
        titulo: d.titulo,
       // descripcion: !d.descripcion || d.descripcion.slice(150),
       descripcion: d.descripcion,
        precio: d.precio,
        urlImagen: d.urlImagen
      })));
    }).catch(err => res.send(err).status(500));
  });

  expressApp.post('/getPublicacion/:idPublicacion', (req, res) => {
    db(`SELECT publicaciones.idPublicacion, publicaciones.idUsuario, titulo, descripcion, estadoComic, precio, fechaEdicion, estadoPublicacion, usuarios.nombre, imagenesPublicaciones.idImagenPublicacion , imagenesPublicaciones.urlImagen 
        FROM publicaciones 
        INNER JOIN usuarios ON (publicaciones.idUsuario = usuarios.idUsuario) 
        LEFT JOIN imagenesPublicaciones ON (publicaciones.idPublicacion = imagenesPublicaciones.idPublicacion) 
        WHERE publicaciones.idPublicacion = ${req.params.idPublicacion}
    `).then((data) => {
      if (!data) res.send().status(500);
      return res.send({
        idPublicacion: data[0].idPublicacion,
        idUsuario: data[0].idUsuario,
        titulo: data[0].titulo,
        descripcion: data[0].descripcion,
        estadoComic: data[0].estadoComic,
        precio: data[0].precio,
        fechaEdicion: data[0].fechaEdicion,
        nombre: data[0].nombre,
        imagenes: data.map(d =>
          ({ idImagenPublicacion: d.idImagenPublicacion, urlImagen: d.urlImagen })),
      });
    }).catch(err => res.send(err).status(500));
  });

/*  expressApp.post('/addPublicacion', (req, res) => {
    db('').then((data) => {
      if (!data) res.send().status(500);
      return res.send(data);
    }).catch(err => res.send(err).status(500));
  });*/

  // User Route
  expressApp.post('/getPerfil/:userId', (req, res) => {
    Promise.all([
      db(`SELECT u.nombre, u.idUsuario, u.fechaCreacion, u.email, 
          (SELECT COUNT(p.idPublicacion) FROM publicaciones as p WHERE p.idUsuario = u.idUsuario AND p.estadoPublicacion = 2 ) as vendidos,  
          (SELECT COUNT(p.idPublicacion) FROM publicaciones as p WHERE p.idUsuario = u.idUsuario ) as publicados 
          FROM usuarios as u 
          WHERE idUsuario = ${req.params.userId}`),
      db(`SELECT * 
        FROM publicaciones  
        WHERE idUsuario = ${req.params.userId}
      `)
    ]).then((data) => {
      if (!data) res.send().status(500);
      return res.send({
        idUsuario: data[0][0].idUsuario,
        nombre: data[0][0].nombre,
        fechaCreacion: data[0][0].fechaCreacion,
        vendidos: data[0][0].vendidos,
        publicados: data[0][0].publicados,
        publicaciones: data[1].map(p => ({
          idPublicacion: p.idPublicacion,
          estadoPublicacion: p.estadoPublicacion,
          precio: p.precio,
          titulo: p.titulo,
          urlImagen: p.urlImagen,
        }))
      });
    }).catch(err => res.send(err).status(500));
  });

  // Chat Route
  expressApp.post('/getChats/:userId', (req, res) => {
    db(`SELECT u.idUsuario, u.nombre, u.imagenUrl,
        (SELECT COUNT(c.idMensaje) FROM mensajes as c 
        WHERE c.estadoMensaje =1 AND ((c.idEmisor = ${req.params.userId} || c.idReceptor = ${req.params.userId} ) && (c.idEmisor = u.idUsuario || c.idReceptor = u.idUsuario )) ) as sinLeer, 
        (SELECT n.fechaCreacion FROM mensajes as n WHERE ((n.idEmisor = ${req.params.userId} || n.idReceptor = ${req.params.userId} ) && (n.idEmisor = u.idUsuario || n.idReceptor = u.idUsuario )) ORDER BY n.fechaCreacion DESC LIMIT 1 ) as ultimoMensaje 
        FROM usuarios as u, mensajes as m  
        WHERE u.idUsuario != ${req.params.userId} AND ((m.idEmisor = ${req.params.userId} || m.idReceptor = ${req.params.userId} ) AND (m.idEmisor = u.idUsuario || m.idReceptor = u.idUsuario ))
        GROUP BY u.idUsuario`)
      .then((data) => {
        if (!data) res.send().status(500);
        return res.send(data);
      }).catch(err => res.send(err).status(500));
  });

  expressApp.post('/getChat/:user1Id/:user2Id', (req, res) => {
     Promise.all([
    db(`SELECT * 
        FROM mensajes 
        WHERE (idEmisor = ${req.params.user1Id} OR idReceptor = ${req.params.user1Id}) 
        AND (idEmisor = ${req.params.user2Id} OR idReceptor = ${req.params.user2Id}) 
        ORDER BY idMensaje ASC LIMIT 30 
        `), db(`UPDATE mensajes SET estadoMensaje=2 WHERE estadoMensaje = 1 AND (idEmisor = ${req.params.user1Id} OR idReceptor = ${req.params.user1Id}) 
        AND (idEmisor = ${req.params.user2Id} OR idReceptor = ${req.params.user2Id})`)])
      .then((data) => {
        if (!data) res.send().status(500);
        return res.send(data[0]);
      }).catch(err => res.send(err).status(500));
  });

  expressApp.post('/addMensaje', (req, res) => {
    db(`INSERT INTO mensajes (contenido, idEmisor, idReceptor) 
        VALUES (?, ?, ?)
        `,[req.body.contenido, req.body.idEmisor, req.body.idReceptor])
      .then((data) => {
        if (!data) res.send().status(500);
        return res.send({ insertId: data.insertId });
      }).catch(err => res.send(err).status(500));
  });

  expressApp.post('/addPublicacion',upload.single('file'), (req, res) => {
   
//console.log(req);
console.log('**************');
    console.log(req.file);
    //console.log(req.body);
    //var img = req.file;
   // res.send({ insertId: data.insertId });
    amazonS3.uploadFile({name:'tt333', body: req.file.buffer}).then(function(data){
        if (!data) res.send().status(500);
        return res.send(data);
    }).catch(err => res.send(err).status(500));

   });

  expressApp.get('/', (req, res) =>
    res.send('Api is running in port 3000'));

  return expressApp.listen(
    server.port,
    () => console.log('Connection has been established successfully.')
  );
};

module.exports = app();
