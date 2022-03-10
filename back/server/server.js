// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  AutoUpdate();

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

var AutoUpdate = function() {
  const models = app.models();
  const dataSource = app.datasources.mysql;
  const modelsName = models.map(model => model.modelName);

  dataSource.autoupdate(modelsName, err => {
    if(err) throw err;
    else{
      console.log("Models updated succesfully");
      //Fil the database with the first use data
      AutoFillData().then((response) => {
        console.log("Auto Fill Successfully");
      }).catch((err) => {
        throw err;
      });
    }
  })
}

/*
model es el modelo al cual se le van a insertar el arreglo de datos
array es el arreglo de datos que se van a insertar en el modelo
tiene que tener una propiedad llamada conditions la cual es un arreglo
que a su vez tiene un objeto obligatorio que tiene key que se utiliza
para crear un filtro dinamico para buscar el dato, y en caso
de que ya se encuentre en la base de datos simplemente no lo volvera a insertar
esto para evitar que se repitan los datos y evitar problemas de referencias en un futuro
y regresa una promesa, que te indica si todo salio bien o algo salio mal
*/
var SeedArrayInModel = function(model, array = [], conditions = [{ key: ""}]){
  return new Promise((resolve, reject) => {
    let cont = 0, limit = array.length;
    array.forEach((element) => {
      let filter = {
        where: {}
      }
      conditions.forEach((condition) => {
        filter.where[condition.key] = element[condition.key];
      })
      model.findOrCreate(filter, element, (err) => {
        if(err) reject(err);
        cont++;
        if(cont == limit) resolve('ok');
      })
    })
  })
}

var SeedRoles = function() {
  return new Promise((res, rej) => {
    const roles = [
      {
        name: 'Admin',
        description: 'Admin of the platform'
      },
      {
        name: 'Seller',
        description: 'Seller of the platform'
      },
      {
        name: 'User',
        description: 'User of the platform'
      }
    ];
    const conditions = [
      {key: 'name'}
    ]
  
    SeedArrayInModel(app.models.Role, roles, conditions).then(() => res()).catch(err => rej(err));
  })
}

var SeedUsers = function() {
  return new Promise((res, rej) => {
    const users = [
      {
        code: '0001',
        role: 'Admin',
        username: 'Admin',
        email: 'admin@vhad.com',
        password: 'p4ssw0rd'
      },
      {
        code: '1001',
        role: 'Seller',
        username: 'Seller',
        email: 'seller@vhad.com',
        password: 'p4ssw0rd'
      },
      {
        code: '2001',
        role: 'User',
        username: 'User',
        email: 'user@vhad.com',
        password: 'p4ssw0rd'
      }
    ];

    let cont = 0, limit = users.length;
    users.forEach(user => {
      app.models.Account.CreateUserWithRole(user, (err, newUser) => {
        if(err) rej(err);
      })
    })
  });
}

var AutoFillData = function() {
  return new Promise(async (res, rej) => {
    try {
      await SeedRoles();
      await SeedUsers();
    } catch (err) {
      rej(err);
    }
    res();
  });
}