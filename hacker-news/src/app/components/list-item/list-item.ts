import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'list-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './list-item.html',
})
export class ListItemComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() by: string = '';
  @Input() descendants: string = '';
  @Input() score: number = 0;
  @Input() time: number = 0;
  @Input() kids: Array<number> = [];
  @Input() type: string = '';
  @Input() url: string = '';
}
