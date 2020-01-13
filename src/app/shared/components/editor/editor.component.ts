import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() customForm: FormGroup;
  @Input('customFormControl') customFormControl:string;

  constructor() {
  }

  ngOnInit() {
  }

}
