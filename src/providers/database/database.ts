import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {
  db: SQLiteObject = null;
  private isOpen : boolean;

  constructor(public http: HttpClient,
              public storage: SQLite) {

    /*
    if(!this.isOpen){
      this.storage = new SQLite();
      this.storage.create({
        name: 'data.db',
        location: 'default',
      }).then(
        (db : SQLiteObject) => {
          this.db = db;
          db.executeSql("CREATE TABLE IF NOT EXISTS networks (id INTEGER PRIMARY KEY AUTOINCREMENT, ipv4 text, mac text)",[]);
          db.executeSql("CREATE TABLE IF NOT EXISTS cases (id INTEGER PRIMARY KEY AUTOINCREMENT, created_time DATETIME DEFAULT CURRENT_TIMESTAMP," +
            "name text, description text )",[]);
          this.isOpen = true;
        }).catch((error) => {
          console.log(error);
      })
    }*/
  }

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }


  createTable(){
    /*let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
    return this.db.executeSql(sql, []);
    */

    // TO DO - CREATE TABLE TO VULN
    // CREATE TABLE TO REPORTS
    // CREATE RELATION

    //this.db.executeSql("alter table host add column cases_id integer", []);
    this.db.executeSql("CREATE TABLE IF NOT EXISTS host_discovery (id INTEGER PRIMARY KEY AUTOINCREMENT, ipv4 number, port number,protocol text,service text ,state text, version text , cases_id integer, cantidad_cve integer);",[]);
    this.db.executeSql("CREATE TABLE IF NOT EXISTS vulnerabilities (id INTEGER PRIMARY KEY AUTOINCREMENT, id_host_discovery number, cve text, description text, cases_id integer, status number );",[]);
    this.db.executeSql("CREATE TABLE IF NOT EXISTS host (id INTEGER PRIMARY KEY AUTOINCREMENT,ipv4 text, mac text, vendor text, status text, types text, cases_id integer);", []);
    this.db.executeSql("CREATE TABLE IF NOT EXISTS networks (id INTEGER PRIMARY KEY AUTOINCREMENT, ipv4 text, mac text);", []);
    return this.db.executeSql("CREATE TABLE IF NOT EXISTS cases (id INTEGER PRIMARY KEY AUTOINCREMENT, created_time DATETIME DEFAULT CURRENT_TIMESTAMP," +
      "name text, description text );",[]);
  }

  insertHostDiscovery(ipv4: string, port: number,protocol: string, state: string, version: string, cases_id: number ,cantidad_cve: number){
    return new Promise((resolve, reject) => {
      //clear host
      let _sql = "DELETE from host_discovery where ipv4 = ? and cases_id = ? and port = ?";
      this.db.executeSql(_sql,[ipv4, cases_id, port]);


      let sql = "INSERT INTO host_discovery (ipv4,port,protocol,state,version,cases_id, cantidad_cve) VALUES (?,?,?,?,?,?,?)";
      this.db.executeSql(sql, [ipv4,port,protocol,state,version,cases_id,cantidad_cve]).then((data)=> {
        resolve(data);
      }, (error) =>{
        reject(error);
      });
    });
  }

  getAllHostsHostDiscovery(cases_id: number){
    return new Promise((resolve, reject)=> {
      this.db.executeSql("SELECT * FROM host_discovery where cases_id = ?", [cases_id]).then((data) => {
          let arrayNetworks = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              arrayNetworks.push({
                id: data.rows.item(i).id,
                ipv4: data.rows.item(i).ipv4,
                port: data.rows.item(i).port,
                protocol: data.rows.item(i).protocol,
                service: data.rows.item(i).service,
                state: data.rows.item(i).state,
                version: data.rows.item(i).version,
                cases_id: data.rows.item(i).cases_id,
                cantidad_cve: data.rows.item(i).cantidad_cve
              });
            }
          }
          resolve(arrayNetworks);
        }, (error) => {
          reject(error);
        }
      );
    });

  }

  insertHostVulnerabilities(id_host_discovery: number, cve: number,description: string, cases_id: string, status: string){
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO vulnerabilities (id_host_discovery,cve,description,cases_id,status) VALUES (?,?,?,?,?)";
      this.db.executeSql(sql, [id_host_discovery,cve,description,cases_id,status]).then((data)=> {
        resolve(data);
      }, (error) =>{
        reject(error);
      });
    });
  }

  createHost(ipv4: string, mac: string, vendor: string, status: string, types: string,cases_id: number){
    return new Promise((resolve, reject) => {
      let _sql = "DELETE from host where cases_id = ?";
      this.db.executeSql(_sql,[cases_id]).then((data) => {
        let sql = "INSERT INTO host (ipv4, mac, vendor, status, types, cases_id) VALUES (?,?,?,?,?,?)";
        this.db.executeSql(sql,[ipv4, mac, vendor, status, types,cases_id]).then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
      }, (error) => {
        reject(error);
      });

    });
  }

  createHost2(ipv4: string, mac: string, vendor: string, status: string, types: string,cases_id: number){
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM host where mac = ? and cases_id = ?", [mac, cases_id]).then((data) => {
        let arrayNetworks = [];
        if(data.rows.length >0) {
          //return new Promise((resolve, reject) => {
            let sql = "UPDATE host set ipv4 = ?, vendor = ?, status = ?, types = ? where mac = ? and cases_id = ?'";
            this.db.executeSql(sql,[ipv4, vendor, status, types, mac, cases_id]).then((data) => {
              resolve(data);
            }, (error) => {
              reject(error);
            });
          //});
        }else{
          //return new Promise((resolve, reject) => {
            let sql = "INSERT INTO host (ipv4, mac, vendor, status, types, cases_id) VALUES (?,?,?,?,?,?)";
            this.db.executeSql(sql,[ipv4, mac, vendor, status, types,cases_id]).then((data) => {
              resolve(data);
            }, (error) => {
              reject(error);
            });
          //});
        }
      });
    });
  }



  getAllHostsByCaseID(cases_id: number){
    return new Promise((resolve, reject)=>{
      this.db.executeSql("SELECT * FROM host where cases_id = ?", [cases_id]).then((data) => {
          let arrayNetworks = [];
          if(data.rows.length >0){
            for (var i = 0; i < data.rows.length; i++){
              arrayNetworks.push({
                ipv4: data.rows.item(i).ipv4,
                mac: data.rows.item(i).mac,
                types: data.rows.item(i).types,
                id: data.rows.item(i).id,
                cases_id: data.rows.item(i).cases_id,
                vendor: data.rows.item(i).vendor
              });
            }
          }
          resolve(arrayNetworks);
        }, (error) =>{
          reject(error);
        }
      );
    });
  }



  getAllNetworks(){
    return new Promise((resolve, reject)=>{
      this.db.executeSql("SELECT * FROM networks", []).then((data) => {
        let arrayNetworks = [];
        if(data.rows.length >0){
          for (var i = 0; i < data.rows.length; i++){
            arrayNetworks.push({
              ipv4: data.rows.item(i).ipv4,
              mac: data.rows.item(i).mac
            });
          }
        }
        resolve(arrayNetworks);
      }, (error) =>{
        reject(error);
        }
      );
    });
  }


  // ###############  CASES FUNCTION  ###############

  getAllCases(){
    return new Promise((resolve, reject)=>{
      this.db.executeSql("SELECT * FROM cases", []).then((data) => {
          let arrayNetworks = [];
          if(data.rows.length >0){
            for (var i = 0; i < data.rows.length; i++){
              arrayNetworks.push({
                id: data.rows.item(i).id,
                created_time: data.rows.item(i).created_time,
                name: data.rows.item(i).name,
                description: data.rows.item(i).description
              });
            }
          }
          resolve(arrayNetworks);
        }, (error) =>{
          reject(error);
        }
      );
    });
  }

  createCase(name: string, description: string){
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO cases (name, description) VALUES (?,?)";
      this.db.executeSql(sql, [name, description]).then((data)=> {
        resolve(data);
      }, (error) =>{
        reject(error);
      });
    });
  }

  deleteCase(id: number){
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM cases WHERE ID = (?)";
      this.db.executeSql(sql, [id]).then((data)=> {
        let sql2 = "DELETE FROM host where cases_id = ?";
        this.db.executeSql(sql2, [id]).then((data)=> {
          resolve(data);
        }, (error) =>{
          reject(error);
        });

        resolve(data);
      }, (error) =>{
        reject(error);
      });
    });
  }


}
