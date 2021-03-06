import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule,
   MatIconModule, MatListModule, MatGridListModule, MatMenuModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatDialogModule, MatInputModule, MatSelectModule} from '@angular/material';
import {MatNativeDateModule, MatSnackBarModule, MatPaginatorModule,
   MatSortModule, MatTabsModule, MatProgressSpinnerModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatTableModule,
     MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule,
     MatFormFieldModule, MatDialogModule, MatInputModule, MatSelectModule,
     MatTabsModule, MatDividerModule, MatSliderModule, MatRadioModule,
     MatNativeDateModule, MatDatepickerModule, MatSnackBarModule,
     MatProgressSpinnerModule, MatSortModule,
    MatCardModule, MatPaginatorModule, MatGridListModule, MatMenuModule, MatTooltipModule ],

  exports: [MatButtonModule, MatCheckboxModule, MatTableModule,
    MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule,
    MatFormFieldModule, MatDialogModule, MatInputModule, MatSelectModule,
    MatTabsModule, MatDividerModule, MatSliderModule, MatRadioModule,
    MatNativeDateModule, MatDatepickerModule, MatSnackBarModule,
    MatProgressSpinnerModule, MatSortModule,
   MatCardModule, MatPaginatorModule, MatGridListModule, MatMenuModule, MatTooltipModule ],
})
export class MaterialModule { }
