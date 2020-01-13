import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatexPipe } from './pipe/datex.pipe';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbDatepickerModule, NgbDateParserFormatter, NgbPaginationModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDateCustomParserFormatter } from './formatter/NgbDateCustomParserFormatter';
import { EditorComponent } from './components/editor/editor.component';
import { QuillModule } from 'ngx-quill';
import { ImageBoxComponent } from './components/image-box/image-box.component';

const config = {
  breakPoints: {
      xs: {max: 600},
      sm: {min: 601, max: 959},
      md: {min: 960, max: 1279},
      lg: {min: 1280, max: 1919},
      xl: {min: 1920}
  },
  debounceTime: 100
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuillModule
  ],
  declarations: [DatexPipe, EditorComponent, ImageBoxComponent],
  exports: [
    DatexPipe,
    ReactiveFormsModule, 
    NgxDatatableModule, 
    NgbDatepickerModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgbModule,
    FormsModule,
    EditorComponent,
    ImageBoxComponent,
    QuillModule,
  ],
  providers: [
      // {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ]
})
export class SharedModule { }
