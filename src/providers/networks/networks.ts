import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NetworksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworksProvider {

  headers = new HttpHeaders();



  url : string = "http://192.168.5.1:5000";

  constructor(public http: HttpClient) {
    this.headers.append('Cache-control', 'no-cache');
    this.headers.append('Expires', '0');
    this.headers.append('Pragma', 'no-cache');
  }


  getDiscovery(){

    return this.http.get(this.url+"/services/discovery", { headers:
      this.headers
    });
  }

  checkevadeLAN(){
    return this.http.get(this.url+"/services/ycbmaster/checkevade", {
      headers:
      this.headers
    });
  }
  checkLAN() {
    return this.http.get(this.url + "/services/ycbmaster/lan", {
      headers:
      this.headers
    });
  }
  checkDNS(){
    return this.http.get(this.url+"/services/ycbmaster/dns", {
      headers:
      this.headers
    });
  }
  checkHTTP(){
    return this.http.get(this.url+"/services/ycbmaster/http", {
      headers:
      this.headers
    });
  }

  checkHTTP_t(){
    return this.http.get(this.url+"/services/ycbmaster/testdnstunneling", {
      headers:
      this.headers
    });
  }

  checkHTTPS(){
    return this.http.get(this.url+"/services/ycbmaster/https", {
      headers:
      this.headers
    });
  }

  getDiscoveryByIp(ipv4){
    return this.http.get(this.url+"/services/ycbmaster/vulns?ipv4="+ipv4, {
      headers:
      this.headers
    });
  }

  getVulnByIp(ipv4){
    return this.http.get(this.url+"/services/ycbmaster/discovery_vulns?ipv4="+ipv4, {
      headers:
      this.headers
    });
  }

  dnsTunneling(){
    return this.http.get(this.url+"/services/ycbmaster/dnstunneling");
  }

  dnsResolver(ipv4){
    return this.http.get(this.url+"/services/ycbmaster/dnsresolver?ipv4="+ipv4);
  }

  clear(){
    return this.http.get(this.url+"/services/ycbmaster/cleartunneling");
  }

  stop_services(opcion){
    return this.http.get(this.url + "/services/ycbmaster/stop_services?opcion="+opcion);
  }





}
