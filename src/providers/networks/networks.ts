import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NetworksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworksProvider {

  url : string = "http://192.168.0.34:5000";

  constructor(public http: HttpClient) {
  }


  getDiscovery(){
    return this.http.get(this.url+"/services/discovery");
  }

  checkevadeLAN(){
    return this.http.get(this.url+"/services/ycbmaster/checkevade");
  }

  checkLAN(){
    return this.http.get(this.url+"/services/ycbmaster/lan");
  }
  checkDNS(){
    return this.http.get(this.url+"/services/ycbmaster/dns");
  }

  checkHTTP(){
    return this.http.get(this.url+"/services/ycbmaster/http");
  }

  checkHTTP_t(){
    return this.http.get(this.url+"/services/ycbmaster/testdnstunneling");
  }

  checkHTTPS(){
    return this.http.get(this.url+"/services/ycbmaster/https");
  }

  getDiscoveryByIp(ipv4){
    return this.http.get(this.url+"/services/ycbmaster/vulns?ipv4="+ipv4);
  }

  getVulnByIp(ipv4){
    return this.http.get(this.url+"/services/ycbmaster/discovery_vulns?ipv4="+ipv4);
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





}
