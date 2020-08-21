let conn = require("./db");
const { query } = require("./db");

class Pagination {

  constructor(
    query,
    params = [],
    intensPerPage = 10
  ){
    
    this.query = query;
    this.params = params;
    this.intensPerPage = intensPerPage;
  }

  getPage(page){

    this.currentPage = page - 1;

    this.params.push(
      this.currentPage * this.intensPerPage,
      this.intensPerPage
    )

    return new Promise((resolve, reject)=>{

      conn.query([this.query, 'SELECT FOUND_ROWS() AS FOUND_ROWS'].join(';'), this.params, (err, results)=>{

        if(err){
          reject(err);

        }else{

          this.data = results[0];
          this.total =results[1][0].FOUND_ROWS;
          this.totalPages = Math.ceil(this.total / this.intensPerPage);
          this.currentPage++;

          resolve(this.data);
        }
      });
    });
  }

  getTotal(){

    return this.total;
  }

  getCurrentPage(){

    return this.currentPage;
  }

  getTotalPages(){

    return this.totalPages;
  }

}

module.exports = Pagination;

