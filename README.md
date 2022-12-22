# Note app

## Table of contents
* [1. Description](#description)
* [2. How to run the application](#how-to-run-the-application)
  * [1. Necessities](#necessities)
  * [2. Optional software](#optional-software)
  * [3. Compiling the scss files](#compiling-the-scss-files)
  * [4. Installing the necessary packages](#installing-the-necessary-packages)
  * [5. Setting up the database](#setting-up-the-database)
    * [1. Checking if everything is set up correctly](#checking-if-everything-is-set-up-correctly) 
* [3. Future implementations](#future-implementations)

## Description
This is a simple application, where you can store and create notes. It's also possible to add notes to favourites, and view only these favourited notes.
For a better user experience, I also added the option to switch between 2 views: card view (***default***) and list view. 
I also added the option to order the notes by newest, oldest, title ascending (A-Z) and title descending (Z-A).

## How to run the application
### Necessities
To run this application, you'll need the following software (all are free):
* `node.js`
* `npm` (Node Packet Manager)
  * Both can be installed from [https://nodejs.org/en/download](https://nodejs.org/en/download). Best is to install the LTS version.
* `A sass compiler` if you want to change the styling. There are various ways to install a sass compiler. One possible way is by using the node package manager and installing the sass package globally.
  * ```$ npm install -g sass```
* Docker
  * Can be installer from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/).

### Optional software
If you want to test endpoints locally without having to use the browser, you can install Postman from [https://www.postman.com/](https://www.postman.com/).

### Compiling the scss files
To apply changes you make in the `.scss` files, you have to compile them to regular a regular `.css` file. <br>
This can be done by using
```bash
$ sass sass/main.scss css/style.css
```
To compile the .scss files everytime you change something, use
```bash
$ sass --watch sass/main.scss css/style.css
```
Both of these commands have to be executed in the public/assets directory.

### Installing the necessary packages
Run the following command to install the necessary packages.
```bash
$ npm install
```

### Setting up the database
Everything needed to create the database can be found in the `resources/database` directory.

In this directory, execute the following commands to set up the Docker container (this only has to be done once).
```bash
$ docker build -t notedb .
$ docker run --detach -p 3307:3306 --name some-notedb  --env MARIADB_ROOT_PASSWORD=1234  notedb
```

This should create and run a docker image running a mariadb database server.
The init.sql script should be executed on creation. It creates a `notedb` database with tables `note` and `favourite` that are seeded with 2 test notes.
There is also a `user` user with `password` 1234 that has access to the database. The database server should be accessible on port `3307` from you host.

If you want to, it's possible to change the username and password that are created when setting up the database, by changing the 
```SQL
CREATE USER 'user' IDENTIFIED BY '1234';
```
line in the init.sql file **BEFORE** executing the commands, to whatever you want the username and password to be.
Also change the `openConnection` function in the `connection.js` file (in the `public/assets/js/data/database/data` directory) to
```js
function openConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: '{your username}',
        password: '{your password}',
        database: 'notedb',
        port: '3307'
    });
}
```

#### Checking if everything is set up correctly
To test if everything is working correctly, the following command can be used to enter the docker environment.
```bash
$ docker exec -it some-notedb bash
```

From there, you should be able to start a MySQL terminal with the following command.
```bash
$ mysql -u user -p1234
```
and check wheter the database is available and complete (use `use notedb` to use the note database).

## Future implementations
In the future, I'll
* Make it possible to remove a note
* Make it possible to edit a note
* Fix the problem with applying multiple filters (only favourites sorted by newest for example)
* Maybe try to add an implementation with a dedicated server
