import { Injectable } from '@nestjs/common';

@Injectable()
export class ListsService {
  private items = [
    { id: 1, title: 'First Item', description: 'This is the first item' },
    { id: 2, title: 'Second Item', description: 'This is the second item' },
    { id: 3, title: 'Third Item', description: 'This is the third item' },
  ];

  findAll() {
    return this.items;
  }

  findOne(id: number) {
    return this.items.find(item => item.id === id);
  }
} 