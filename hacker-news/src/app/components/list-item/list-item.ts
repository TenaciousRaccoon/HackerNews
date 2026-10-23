import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import type { Story } from '../../models/story.model';

@Component({
  selector: 'list-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './list-item.html',
})
export class ListItemComponent {
  readonly story = input.required<Story>();
}
