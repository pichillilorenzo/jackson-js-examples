import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { WriterService } from 'src/app/services/writer.service';
import { Writer } from 'src/app/models/writer.model';
import { Book } from 'src/app/models/book.model';
import { ObjectMapper } from 'jackson-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private bookService: BookService,
              private writerService: WriterService) { }

  ngOnInit(): void {
    this.writerService.getAllPublic().subscribe((response) => {
      console.log(response);
    });

    this.bookService.getAllPublic().subscribe((response) => {
      console.log(response);
    });

    this.writerService.getAll().subscribe((response) => {
      console.log(response);
    });

    this.bookService.getAll().subscribe((response) => {
      console.log(response);
    });

    const newBook = new Book();
    newBook.title = 'New Book';
    newBook.cover = 'https://picsum.photos/640/480?random=1';
    newBook.price = 23;

    const newWriter = new Writer();
    newWriter.firstname = 'John';
    newWriter.lastname = 'Alfa';
    newWriter.books = [newBook];
    newWriter.image = 'https://picsum.photos/640/480?random=2';
    newWriter.biography = 'Dolorem suscipit ad nesciunt non aut numquam at alias.';

    this.writerService.add(newWriter).subscribe((response) => {
      console.log(response);
    });

    const newBook2 = new Book();
    newBook2.title = 'New Book 2';
    newBook2.cover = 'https://picsum.photos/640/480?random=3';
    newBook2.price = 12;

    this.bookService.add(newBook2).subscribe((response) => {
      console.log(response);
    });
  }

}
