import { 
  MatDialogModule, 
  MatButtonModule, 
  MatProgressBarModule, 
  MatIconModule, 
  MatTooltipModule, 
  MatFormFieldModule, 
  MatDatepickerModule, 
  MatToolbarModule,
  MatSelectModule,
  MatCardModule,
  MatNativeDateModule} from '@angular/material';
  import {MatInputModule} from '@angular/material/input';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class MatComponentsModule { }
