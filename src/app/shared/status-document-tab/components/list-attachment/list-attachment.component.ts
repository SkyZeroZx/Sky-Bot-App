import { Component, Input } from '@angular/core';
import { Attachment } from '@core/interfaces';

@Component({
  selector: 'app-list-attachment',
  templateUrl: './list-attachment.component.html',
  styleUrls: ['./list-attachment.component.scss'],
})
export class ListAttachmentComponent {
  @Input() listAttachment: Attachment[] = [];
}
