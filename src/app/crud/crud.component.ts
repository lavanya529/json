import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class Book{
  id:number;
  title:string
  year:number;
  Author:string;
  
  constructor(id:number,title:string,year:number,Author:string){
    this.id = id;
    this.title = title;
    this.year = year;
    this.Author= Author
  }
  
  }

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})


export class CrudComponent implements OnInit {
  
  url:string = "../assets/book.json"
  Books:Array<Book> = [];
  isClicked:boolean=false;
  newbook:Book
  index: number;

  constructor(private httpClient : HttpClient) { }

  ngOnInit() {
    this.httpClient.get<Book[]>(this.url).subscribe(
      (responce)=>{
        console.log(responce)
        this.Books = responce
        console.log(this.Books)
      },
      (error)=>{
        console.log("NOT")
      }
    )
  }

  deleteBook(id:number){
    this.Books.splice(id,1)
  }

  addBook(value:any){
    this.Books.push(new Book(value.id,value.title,value.year,value.Author))
  }

  
  updateBook(i:number){
    this.isClicked=true;
  
      this.newbook=this.Books[i]
      this.index=i
    
      }
      update(value:any){
        this.Books.splice(this.index,1,new Book(this.newbook.id,value.title,value.year,value.Author))
        this.isClicked=false
      }
}
