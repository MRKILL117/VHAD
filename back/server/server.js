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
  const modelsName = models.filter(model => model.config.dataSource.name == dataSource.name).map(model => model.modelName);

  dataSource.autoupdate(modelsName, err => {
    if(err) throw err;
    else {
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
conditions = [{ key: ""}]
*/
var SeedArrayInModel = function(model, array = [], conditions = []){
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

var SeedCategories = function() {
  return new Promise((res, rej) => {
    const categories = [
      {
        id: 1,
        name: 'CPU',
      },
      {
        id: 2,
        name: 'Laptops',
      },
      {
        id: 3,
        name: 'Graficas',
      },
      {
        id: 4,
        name: 'Sonido',
      },
      {
        id: 5,
        name: 'Memorias y almacenamiento',
      },
      {
        id: 6,
        name: 'Herramientas y mantenimiento',
      },
      {
        id: 7,
        name: 'Monitores',
      },
      {
        id: 8,
        name: 'Accesorios',
      },
    ];
    const conditions = [
      {key: 'name'}
    ]
  
    SeedArrayInModel(app.models.Category, categories, conditions).then(() => res()).catch(err => rej(err));
  })
}

var SeedSubcategories = function() {
  return new Promise((res, rej) => {
    const subcategories = [
      {
        name: 'Tarjeta dedicada',
        categoryId: 4,
      },
      {
        name: 'Bocinas',
        categoryId: 4,
      },
      {
        name: 'Audifonos',
        categoryId: 4,
      },
      {
        name: 'USB',
        categoryId: 5,
      },
      {
        name: 'SSD',
        categoryId: 5,
      },
      {
        name: 'HDD',
        categoryId: 5,
      },
      {
        name: 'SD',
        categoryId: 5,
      },
      {
        name: 'RAM',
        categoryId: 5,
      },
      {
        name: 'Herramientas',
        categoryId: 6,
      },
      {
        name: 'Consumibles',
        categoryId: 6,
      },
      {
        name: 'Teclados',
        categoryId: 8,
      },
      {
        name: 'Mouses',
        categoryId: 8,
      },
      {
        name: 'Mochilas',
        categoryId: 8,
      },
      {
        name: 'Fundas',
        categoryId: 8,
      },
      {
        name: 'Cables',
        categoryId: 8,
      },
    ];
    const conditions = [
      {key: 'name'}
    ]
  
    SeedArrayInModel(app.models.Subcategory, subcategories, conditions).then(() => res()).catch(err => rej(err));
  })
}

var SeedFilters = function() {
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
        role: 'Admin',
        username: '0001',
        email: 'admin@vhad.com',
        password: 'p4ssw0rd',
        firstTimeConfiguration: false
      },
      {
        role: 'Seller',
        username: '1001',
        email: 'seller@vhad.com',
        password: 'p4ssw0rd',
        firstTimeConfiguration: true
      },
      {
        role: 'User',
        username: '2001',
        email: 'user@vhad.com',
        password: 'p4ssw0rd',
        firstTimeConfiguration: true
      }
    ];

    let cont = 0, limit = users.length;
    users.forEach(user => {
      app.models.Account.CreateUserWithRole(user, (err, newUser) => {
        if(err && !err.hasOwnProperty('errorCode')) rej(err);
        cont++;
        if(cont == limit) res();
      })
    })
  });
}

var SeedFolders = function() {
  return new Promise((res, rej) => {
    const folders = [
      'profile-images',
      'product-images'
    ];
  
    const Folder = app.models.Folder;
    let cont = 0, limit = folders.length;
    folders.forEach(folder => {
      // Get the container and if it doesn't exist, then create the container
      Folder.getContainer(folder, (err, container) => {
        // Check if the error code is related with "No such file or directory" (ENOENT)
        // and if it does, create the container
        if(err && err.code == "ENOENT") {
          Folder.createContainer({name: folder}, (err, newContainer) => {
            if(err) rej(err);

            cont++;
            if(cont == limit) res();
          });
        }
        else {
          cont++;
          if(cont == limit) res();
        }
      });
    })
  });
}

var FixUsersWithoutUsername = function() {
  return new Promise((res, rej) => {
    app.models.Account.find({where: {username: null}, include: {'role': 'role'}}, (err, usersWithoutUsername) => {
      if(err) rej(err);

      if(!usersWithoutUsername.length) res();
      let cont = 0, limit = usersWithoutUsername.length;
      usersWithoutUsername.forEach(user => {
        user.username = GenerateUserCode(user.role().role().name);
        user.save((err, userSaved) => {
          if(err) rej(err);

          cont++;
          if(cont == limit) res();
        });
      });
    });
  });
}

var GenerateUserCode = function(role) {
  let userCode = '';
  for (let i = 0; i < 3; i++) {
    const randNum = Math.round(9 * Math.random());
    userCode = userCode.concat(String(randNum));
  }
  switch (role) {
    case 'Admin': return `0${userCode}`;
    case 'Seller': return `1${userCode}`;
    case 'User': return `2${userCode}`;
    default: return null;
  }
}

var AutoFillData = function() {
  return new Promise(async (res, rej) => {
    try {
      await SeedRoles();
      await SeedUsers();
      await SeedFolders();
      await SeedCategories();
      await SeedSubcategories();
      await FixUsersWithoutUsername();
    } catch (err) {
      rej(err);
    }
    res();
  });
}